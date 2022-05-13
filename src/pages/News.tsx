import React, {useEffect, useState} from 'react';
import {newsAPI} from "../services/NewsService";
import {checkLogin} from "../store/reducers/CheckLogin/ActionCreator";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {toast} from "react-toastify";
import {INews} from "../models/news";

import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import cn from "classnames";

const News = () => {
    const dispatch = useAppDispatch()

    const {data: news, isLoading, isError} = newsAPI.useFetchAllNewsQuery(25)
    const {user} = useAppSelector(state => state.loginReducer)

    const [modalActive, setModalActive] = useState(false)

    const [createPost, {}] = newsAPI.useCreatePostMutation()
    const [deletePost] = newsAPI.useDeletePostMutation()
    const [approvePost] = newsAPI.useApprovePostMutation()

    const [newPost, setNewPost] = useState(() => {
        return {
            title: "",
            text: "",
        }
    })
    const [filter, setFilter] = useState('')

    useEffect(() => {
        dispatch(checkLogin())
    }, [])

    const filteredNews = news && news.filter((post: INews) => {
        const title = post.title && post.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        const text = post.text && post.text.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        const date = post.date && post.date.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        if (title || text || date) {
            return (post)
        }
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPost(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }

    const handleFormSubmit = async () => {
        if (newPost.title.length !== 0 && newPost.text.length !== 0) {
            await createPost({
                title: newPost.title,
                text: newPost.text,
                date: new Date().toLocaleDateString(),
                approved: false
            } as INews)
            setModalActive(false)
            toast.success(`Post ${newPost.title} Added`)
        } else {
            toast.warn('Need to fill all')
        }
    }

    const handleDelete = (post: any) => {
        deletePost(post)
        setModalActive(false)
        toast.info(`User ${post.title} Deleted`)
    }

    const handleApprove = (post: any) => {
        const approved = true
        approvePost({...post, approved})
        setModalActive(false)
        toast.success(`Post ${post.title} approved`)
    }

    return (
        <div className='page'>
            {
                isLoading && <h1>Loading ...</h1>
            }

            {
                isError && <h1>{isError}</h1>
            }

            {
                news &&
                <>
                    <div className='news'>
                        <Input id='filter'
                               labelText='Filter'
                               handleChange={handleFilter}/>
                        {
                            user && user.rights === 'admin'
                                ? filteredNews && filteredNews.map(post => (
                                <div key={post.title}
                                     className='news-item'>
                                    <div className='news-item_info'>
                                        <h2>{post.title}</h2>
                                        <p>{post.text}</p>
                                        <p className='news-item_date'>{post.date}</p>
                                    </div>

                                    {
                                        user && user.rights === 'admin' &&
                                        <div>
                                            <span className='approve'>{post.approved ? 'approved' : 'need approve'}</span>

                                            <Button buttonText='Approve'
                                                    className={cn('btn-success', {['disabled']: post.approved})}
                                                    isDisabled={post.approved}
                                                    onClick={() => handleApprove(post)}/>
                                            <Button buttonText='Delete'
                                                    className='btn-error'
                                                    onClick={() => handleDelete(post)}/>
                                        </div>
                                    }
                                </div>
                            ))
                                : <>
                                    {
                                        filteredNews && filteredNews.map(post => post.approved && (
                                            <div key={post.title}
                                                 className='news-item'>
                                                <div>
                                                    <h2>{post.title}</h2>
                                                    <p>{post.text}</p>
                                                    <p className='news-item_date'>{post.date}</p>
                                                </div>
                                            </div>
                                        ))

                                    }
                                    <Button buttonText='Add post'
                                            type='submit'
                                            className='btn-primary ml'
                                            onClick={() => setModalActive(!modalActive)}/>
                                </>
                        }
                    </div>

                    <Modal active={modalActive}
                           setActive={setModalActive}>
                        <Input handleChange={handleInputChange}
                               id='title'
                               labelText='Post title'
                               value={newPost.title}/>
                        <Input handleChange={handleInputChange}
                               id='text'
                               labelText='Post text'
                               value={newPost.text}/>

                        <Button buttonText='Submit'
                                type='submit'
                                className='btn-primary ml'
                                onClick={handleFormSubmit}/>
                    </Modal>
                </>
            }
        </div>
    )
}

export default News;
