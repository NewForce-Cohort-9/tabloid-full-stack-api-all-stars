import { useEffect, useState } from "react"
import { getAllTags } from "../../Managers/TagManager.js"
import { Button, Table } from "reactstrap"
import { useLocation, useNavigate } from "react-router-dom"
import { getPostTagsByPostId, submitPostTag } from "../../Managers/PostTagManager.js"

export const PostTags = () => {
    const [postTags, setPostTags] = useState([])
    const [filteredPostTags, setFilteredPostTags] = useState([])
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
        getAllTags().then(tagArr => {
            let filter = []
            tagArr.forEach(tag => {
                if (!postTags.find(obj => obj.tagId === tag.id)) {
                    filter.push(tag)
                }
            });
            setFilteredPostTags(filter)
        })
    }, [postTags])

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
                    {filteredPostTags.map(tag => {
                        return <>
                            <tr>
                                <td>
                                    {tag.name}
                                </td>
                                <td>
                                    <input type="checkbox"
                                        onClick={(e) => {
                                            if (e.target.checked) {
                                                let copyTagList = [...postTagsForSubmit]
                                                let tagObj = {
                                                    postId: state.post.id,
                                                    tagId: tag.id,
                                                    tag: null
                                                }
                                                copyTagList.push(tagObj)
                                                setPostTagsForSubmit(copyTagList)
                                            } else {
                                                let copyTagList = postTagsForSubmit.filter(tagListObj => tagListObj.tagId != tag.id)
                                                setPostTagsForSubmit(copyTagList)
                                            }
                                        }}
                                    />
                                        
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