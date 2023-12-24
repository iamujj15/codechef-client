import { Comment } from "./Comment"

export function CommentList({ comments, allComments, nesting_level, blogHandler }) {
    return comments.map(comment => (
        <div key={comment.id} className="comment-stack">
            <Comment allComments={allComments} {...comment} nesting_level={nesting_level} blogHandler={blogHandler} />
        </div>
    ))
}