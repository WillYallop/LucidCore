/*

This controller is in charge of handling the theme/config/posts.json file.

This file is responsible for adding custom post types such as blogs, or projects for example.
These are similar to a standard page, but they all share the same template file, and are also queryable through the API.
 
Example posts.json file:

[
    {
        "name": "blogs",
        "template_name": "page.twig"
    },
    {
        "name": "jobs",
        "template_name": "page.twig"
    }
]

*/

import { getSingleFileContent, writeSingleFile } from './theme';
import validate from '../validator';
import { __verifyFieldsToErrorArray } from './helper/shared';


// ------------------------------------ ------------------------------------
// add new post type entry
// ------------------------------------ ------------------------------------
const addPostType = async (name: string, template_name: string): Promise<cont_post_addPostTypeRes> => {
    // Make sure entry doesnt already exist with same name
    // Verify the template_name exists in the theme/templates directory will always end in a .twig
    let verifyData = await validate([
        {
            method: 'post_name',
            value: name
        },
        {
            method: 'temp_verifyFileExists',
            value: template_name
        },
        {
            method: 'file_isTwigExtension',
            value: template_name
        }
    ]);
    if(verifyData.valid) {
        // Get theme/config/posts.json file
        let postsData: Array<cont_post_postDeclaration> = await getSingleFileContent('/config/posts.json', 'json');

        // Check to see if the post wanting to be added exists:
        let findPost = postsData.findIndex( x => x.name === name.toLowerCase() && x.template_name === template_name);
        if(findPost === -1) {
            // If there is no entry add one
            let postObj: cont_post_postDeclaration = {
                name: name,
                template_name: template_name
            };
            postsData.push(postObj);
            let response = await writeSingleFile('/config/posts.json', 'json', postsData);
            return {
                saved: response,
                post_type: postObj
            }
        }
        else {
            // Throw
            return {
                saved: false,
                errors: [
                    {
                        code: 403,
                        origin: 'addPostType',
                        title: 'Post Already Registered',
                        message: `Post with the name: "${name}" and template_name: "${template_name}" already exist!`
                    }
                ]
            }
        }
    }
    else {
        // Define custom errors
        let errors: Array<core_errorMsg> = [];
        return {
            saved: false,
            errors: __verifyFieldsToErrorArray(errors, verifyData.fields)
        }
    }
}

// ------------------------------------ ------------------------------------
// remove single post type entry
// ------------------------------------ ------------------------------------
const removePostType = async () => {

}

// ------------------------------------ ------------------------------------
// update post type entry
// ------------------------------------ ------------------------------------
const updatePostType = async () => {

}

// ------------------------------------ ------------------------------------
// get single post type entry
// ------------------------------------ ------------------------------------
const getSinglePostType = async () => {

}

// ------------------------------------ ------------------------------------
// get all post types entries
// ------------------------------------ ------------------------------------
const getAllPostTypes = async () => {

}

export {
    addPostType,
    removePostType,
    updatePostType,
    getSinglePostType,
    getAllPostTypes
}