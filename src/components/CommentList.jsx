import { Comment } from "./Comment"

export function CommentList({ comments, allComments, nesting_level, handleBlog }) {
    return comments.map(comment => (
        <div key={comment.id} className="comment-stack">
            <Comment allComments={allComments} {...comment} nesting_level={nesting_level} handleBlog={handleBlog} />
        </div>
    ))
}