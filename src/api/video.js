//创建视频
export const createVideo = "/video/create"
//视频列表
export const listVideo = "/video/list"
// 删除视频
export const deleteVideo = (identity) => `/video/${identity}`;
// 视频详情
export const detailVideo = (identity) => `/video/${identity}`;