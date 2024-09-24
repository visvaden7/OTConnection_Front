import {FunctionComponent, useEffect, useMemo, useState} from "react";
import {Avatar, Button, Input} from "antd";
import {useAuth} from "../../hooks/useAuth.ts";
import {v4 as uuid} from "uuid";
import axios from "axios";
import {AvatarGenerator} from "random-avatar-generator";
import {Nullable} from "../../@types/global.ts";
import {API_ENDPOINT} from "../../const/constant.ts";
import {ResponseCommentList} from "../../@types/api.ts";
import {getCommentTime} from "../../utils/getTimeFromNow.ts";

interface CommentType {
  id: number;
  com_id: number;
  user_id: number;
  post_id: number;
  parent_id: Nullable<number>;
  avatarUrl: string;
  fullName: string;
  text: string;
  createdAt: string,
  replies: string[];
}

interface Props {
  postId: string;
}

export const AlternativeComments: FunctionComponent<Props> = ({postId}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [inputComments, setInputComments] = useState<string>("");
  const [editComments, setEditComments] = useState<string>("");
  const [isEdit, setIsEdit] = useState(false)
  const [editCommentId, setEditCommentId] = useState<number>(-1)
  const {user, setIsModalOpen} = useAuth();
  const avatarUrl = useMemo(() => {
    const generator = new AvatarGenerator();
    return user?.avatar ? user.avatar : generator.generateRandomAvatar();
  }, [user]);
  
  
  const handleAddComments = async () => {
    const commentData = {
      userId: user?.user_id,
      comId: uuid(),
      postId,
      avatarUrl: user?.avatar,
      fullName: user?.nick,
      text: inputComments,
      replies: [],
    };
    
    try {
      if (!user) {
        setIsModalOpen(true)
        setInputComments(""); // 입력 필드를 초기화
      } else {
        await axios.post(`${API_ENDPOINT}/comments/`, commentData);
        setInputComments(""); // 입력 필드를 초기화
      }
      await getComments(Number(postId)); // 댓글 목록을 새로 불러옴
    } catch (err) {
      console.error(err);
    }
  };
  
  
  const handleEdit = (text: string, comId: number) => {
    setIsEdit(true)
    setEditCommentId(comId)
    setEditComments(text)
  }
  
  const handleUpdateComments = async (comId: number, text: string, replies: string[], postId:number) => {
    try {
      console.log(comId)
      await axios.put(`${API_ENDPOINT}/comments/${comId}`, {text, replies})
      setIsEdit(false)
      setEditCommentId(0)
      setEditComments('')
      await getComments(postId)
      
      
    } catch (err) {
      console.error("댓글을 업데이트하는데 실패했습니다.", err);
    }
  }
  
  
  const handleDeleteComments = async (comId: number) => {
    try {
      await axios.delete(`${API_ENDPOINT}/comments/${comId}`);
      await getComments(Number(postId));
    } catch (err) {
      console.error(err)
    }
  }
  
  const getComments = async (postId: number) => {
    try {
      const response = await axios.get<ResponseCommentList[]>(`${API_ENDPOINT}/comments/${postId}`);
      const data = response.data.map(({replies, createdAt, ...comment}) => ({
        ...comment,
        replies: JSON.parse(replies),
        createdAt: createdAt
      }));
      setComments(data);
    } catch (error) {
      console.error("댓글을 불러오는 중 오류가 발생했습니다.", error);
    }
  };
  
  useEffect(() => {
    void getComments(Number(postId));
  }, [postId]);
  
  return comments ? (
      <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
        <div style={{fontWeight: "bold", marginBottom: "10px"}}>댓글 {comments.length} 개</div>
        {/* 댓글 입력 영역 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            background: "#f7f7f7",
          }}
        >
          <Avatar
            src={user ? user.avatar : avatarUrl}
            alt={user ? `${user.nick}의 프로필` : "guest의 프로필"}
            style={{width: "50px", height: "50px", marginRight: "10px"}}
          />
          <Input.TextArea
            rows={1}
            value={inputComments}
            onChange={(e) => setInputComments(e.target.value)}
            placeholder={user ? "댓글을 입력하세요..." : "로그인을 하세요"}
            style={{
              flex: 1,
              border: "none",
              background: "#f0f0f0",
              resize: "none",
              padding: "10px",
              borderRadius: "5px",
            }}
          />
          <Button onClick={handleAddComments} type="primary" style={{marginLeft: "10px"}}>
            등록
          </Button>
        </div>
        
        {/* 댓글 표시 영역 */}
        <div style={{marginTop: "20px", width: "100%"}}>
          {comments.map((comment) => (
            <div
              key={comment.com_id}
              style={{
                position: "relative",
                padding: "10px 20px",
                marginBottom: "10px",
                borderRadius: "8px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <div style={{display: "flex", alignItems: "center"}}>
                <Avatar src={comment.avatarUrl} style={{marginRight: "10px", width: "40px", height: "40px"}}/>
                <div>
                  <strong>{comment.fullName}</strong>
                  <span style={{marginLeft: "10px", color: "#999"}}>{getCommentTime(comment.createdAt)}</span>
                </div>
              </div>
              {isEdit && editCommentId === comment.com_id
                ? <div>
                  <Input.TextArea
                    rows={1}
                    value={editComments}
                    onChange={(e) => setEditComments(e.target.value)}
                    placeholder={user ? "댓글을 입력하세요..." : "로그인을 하세요"}
                    style={{
                      flex: 1,
                      border: "none",
                      background: "#f0f0f0",
                      resize: "none",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  />
                  <Button onClick={() =>handleUpdateComments(comment.com_id, editComments, [], Number(postId))} type="primary" style={{marginLeft: "10px"}}>
                    수정
                  </Button>
                </div>
                : <div style={{marginTop: "10px", paddingLeft: "50px"}}>{comment.text}</div>
              }
              
              {/* 수정 및 삭제 버튼 */}
              {
                user ?
                  <div style={{position: "absolute", right: "20px", top: "10px"}}>
                    <Button style={{marginRight: "5px"}} size="small"
                            onClick={() => handleEdit(comment.text, comment.com_id)}>
                      수정
                    </Button>
                    <Button size="small" onClick={() => handleDeleteComments(comment.com_id)}>
                      삭제
                    </Button>
                  </div>
                  : null
              }
              
              {/* 대댓글 영역 */}
              {comment.replies.length > 0 && (
                <div style={{marginTop: "10px", paddingLeft: "50px"}}>
                  {comment.replies.map((reply, index) => (
                    <div key={index} style={{padding: "5px 0"}}>
                      <Avatar src={avatarUrl} style={{marginRight: "10px", width: "30px", height: "30px"}}/>
                      <span>{reply}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ) :
    null;
};
