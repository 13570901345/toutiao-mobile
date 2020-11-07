import request from '@/utils/request'

// 发送用户登录请求
export const userlogin = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取人机验证码
export const getcode = (mobile) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/sms/codes/${mobile}`

  })
}

// 获取用户个人资料
export const getuser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    //  headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    //  }
  })
}

// 获取用户的文章导航栏数据
export const getusernav = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// export const getUserChannels = () => {
//     return request({
//       method: 'GET',
//       url: '/app/v1_0/user/channels'
//     })
//   }

// 获取所以推荐频道导航的数据
export const getallchannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 用来存储用户指定的频道
export const setuserchannels = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}

// 删除用户指定频道
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}

// 关注用户
export const getfollow = userid => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userid
    }
  })
}
// 取消关注用户
export const deletefollow = userid => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userid}`
  })
}

// 收藏用户
export const getcollect = articleid => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: articleid
    }
  })
}

// 取消收藏用户
export const deletecollect = articleid => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleid}`
  })
}

// 获取指定用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

// 修改用户个人资料
export const updataUserprofile = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

// 修改用户照片资料
export const updataUserphoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
