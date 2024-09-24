import { useEffect, useState } from "react"
import { getAllTags } from "../../Managers/TagManager.js"
import { Button, Table } from "reactstrap"
import { useLocation, useNavigate } from "react-router-dom"
import { getPostTagsByPostId, submitPostTag } from "../../Managers/PostTagManager.js"

export const PostTags = () => {
    const [tagList, setTagList] = useState([])
    const [postTags, setPostTags] = useState([])
    const [postTagsForSubmit, setPostTagsForSubmit] = useState([])

    const { state } = useLocation()
    const navigate = useNavigate()

    const submitTags = () => {
        postTagsForSubmit.forEach(postTag => {
            submitPostTag(postTag)
        });
        navigate(`/post/${state.post.id}`)
    }
    
    useEffect(() => {
        getPostTagsByPostId(state.post.id).then(postTagsArr => setPostTags(postTagsArr))
    }, [])

    useEffect(() => {
        getAllTags().then(tagArr => setTagList(tagArr))
    }, [])

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Add Tag To Post
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tagList.map(tag => {
                        return <>
                            <tr>
                                <td>
                                    {tag.name}
                                </td>
                                <td>
                                    {postTags.find(postTag => postTag.id === tag.id) ?  
                                        <input type="checkbox"
                                            checked
                                            onClick={(e) => {
                                                if (e.target.checked) {
                                                    let copyTagList = [...postTagsForSubmit]
                                                    let tagObj = {
                                                        postId: state.post.id,
                                                        tagId: tag.id
                                                    }
                                                    copyTagList.push(tagObj)
                                                    setPostTagsForSubmit(copyTagList)
                                                } else {
                                                    let copyTagList = postTagsForSubmit.filter(tagListObj => tagListObj.tagId != tag.id)
                                                    setPostTagsForSubmit(copyTagList)
                                                }
                                            }}
                                        />
                                    :
                                        <input type="checkbox"
                                            onClick={(e) => {
                                                if (e.target.checked) {
                                                    let copyTagList = [...postTagsForSubmit]
                                                    let tagObj = {
                                                        postId: state.post.id,
                                                        tagId: tag.id
                                                    }
                                                    copyTagList.push(tagObj)
                                                    setPostTagsForSubmit(copyTagList)
                                                } else {
                                                    let copyTagList = postTagsForSubmit.filter(tagListObj => tagListObj.tagId != tag.id)
                                                    setPostTagsForSubmit(copyTagList)
                                                }
                                            }}
                                        />
                                    }
                                </td>
                            </tr>
                        </>
                    })}
                </tbody>
            </Table>
            <Button color="info" onClick={() => submitTags()}>Submit!</Button>
        </>
    )
}