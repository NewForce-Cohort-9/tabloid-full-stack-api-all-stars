import { useEffect, useState } from "react"
import { getAllTags } from "../../Managers/TagManager.js"
import { Button, Table } from "reactstrap"
import { useLocation, useNavigate } from "react-router-dom"

export const PostTags = () => {
    const [tagList, setTagList] = useState([])
    const [postTags, setPostTags] = useState([])

    const { state } = useLocation()
    const navigate = useNavigate()

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
                        <>
                            <td>
                                {tag.name}
                            </td>
                            <td>
                                <input type="checkbox" onClick={(e) => {
                                    if (e.target.value = checked) {
                                        let copyTagList = {...tagList}
                                        let tagObj = {
                                            postId: state.post.postId,
                                            tagId: tag.id
                                        }
                                        copyTagList.push(tagObj)
                                        setPostTags(copyTagList)
                                    } else {
                                        let copyTagList = tagList.filter(tagListObj => tagListObj.id != tag.id)
                                        setPostTags(copyTagList)
                                    }
                                }}/>
                            </td>
                        </>
                    })}
                </tbody>
            </Table>
            <Button color="info" onClick={submitPostTags().then(navigate(`/post`))}></Button>
        </>
    )
}