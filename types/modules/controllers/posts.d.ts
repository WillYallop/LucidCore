// Key: cont_post_

interface cont_post_postDeclaration {
    name: string
    template_name: string
}

// addPostType()
interface cont_post_addPostTypeRes {
    saved: boolean,
    post_type?: cont_post_postDeclaration
    errors?: Array<core_errorMsg>
}