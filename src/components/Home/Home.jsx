import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchUsers } from '../../store/reducers/ActionCreators';
import { logOut } from '../../store/reducers/LoginCheckSlice';
import style from './Home.module.css'


const Home = () => {
  const isLogined = useSelector(store => store.loginPage.isLogined)
  const dispatch = useDispatch()
  const postsWithUsers = useSelector(store => store.users.postsWithUsers)
  const totalCount = useSelector(store => store.users.totalCount)
  const mapPosts = postsWithUsers.map(post =>
    <div className={style.Post} key={post.id}>
      <div className={style.PostBodyTitle}>
        <p className={style.P}>{post.title}</p>
        <p className={style.P}>{post.body}</p>
      </div>
      <div className={style.UserInfo}>
        <div className={style.TextInfo}>
          <p className={style.P}>{post.name}</p>
          <p className={style.P}>{post.company}</p>
        </div>
        <div className={style.ImgInfo}>
          <img className={style.Img} src={post.photo} />
        </div>
      </div>
    </div>
  )







  const [pagesCount, setPagesCount] = useState(1)

  const [fetching, setFetching] = useState(true)

  const logOutFunc = () => {
    dispatch(logOut())
  }

  console.log(totalCount);

  useEffect(() => {
    if (fetching && postsWithUsers.length < totalCount) {
      dispatch(fetchUsers(pagesCount))
      setPagesCount(prev => prev + 1)
      setFetching(false)

    }
  }, [fetching])



  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1) { setFetching(true) }
  }

  return (
    <div className={style.home}>
      {isLogined ?
        <div className={style.Header}>
          <h1 className={style.Title}>Список постов</h1>
          <button className={style.Button} onClick={logOutFunc}>Выйти</button>
        </div> :
        <Navigate to="/" replace={true} />
      }
      <div className={style.PostsBlock}>{mapPosts}</div>
    </div>
  )
}


export default Home