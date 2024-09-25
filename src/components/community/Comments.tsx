import {FunctionComponent, useEffect, useState} from 'react';
import {CommentSection} from 'react-comments-section';
import 'react-comments-section/dist/index.css';
import axios from "axios";
import {API_ENDPOINT} from "../../const/constant.ts";
import {ResponseCommentList} from "../../@types/api.ts";
import {Nullable} from "../../@types/global.ts";
import {useAuth} from "../../context/AuthContext.tsx";

interface CommentType {
  "id": number,
  "user_id": number,
  "post_id": number,
  "parent_id": Nullable<number>,
  "avatarUrl": string,
  "fullName": string,
  "text": string,
  "replies": string[],
}


interface Props {
  postId: string
}

export const Comments: FunctionComponent<Props> = ({postId}) => {
  const [data, setData] = useState<CommentType[]>([]);
  
  const getComments = async (postId: number) => {
    const response = await axios.get<ResponseCommentList[]>(`${API_ENDPOINT}/comments/${postId}`)
    setData(response.data.map(({replies, ...comment}) => ({...comment, replies: JSON.parse(replies)})))
  }
  
  useEffect(() => {
    void getComments(1)
  }, []);
  
  const {user} = useAuth()
  
  // 댓글 제출 시 호출되는 함수
  const onSubmitAction = async (commentData: {
    userId: string;
    comId: string;
    avatarUrl: string;
    userProfile?: string;
    fullName: string;
    text: string;
    replies: any
  }) => {
    try {
      // 새로운 댓글을 서버에 추가
      const response = await axios.post(`${API_ENDPOINT}/comments`, {
        post_Id: postId,
        com_Id: commentData.comId,
        ...commentData,
      });
      
      // 서버로부터 성공적으로 응답을 받으면 상태를 업데이트
      setData([...data, {...response.data, replies: JSON.parse(response.data.replies)}]); // 서버에서 저장된 댓글을 받아서 추가
      console.log('Comment submitted:', response.data);
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
    
  };
  
  const customNoComment = () => <div className="no-com">No comments yet!</div>;
  
  return (
    user ? (
      <div>
        <CommentSection
          currentUser={{
            currentUserId: String(user.user_id),
            currentUserImg: user.avatar,
            currentUserProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
            currentUserFullName: user.nick
          }}
          commentData={data as any}
          onSubmitAction={onSubmitAction}
          customNoComment={customNoComment}
          logIn={{
            loginLink: 'http://localhost:3001/',
            signupLink: 'http://localhost:3001/'
          }}
          onDeleteAction={(data: any) => console.log('comment was deleted', data)}
          onReplyAction={(data: {
            userId: string
            parentOfRepliedCommentId: string
            repliedToCommentId: string
            avatarUrl: string
            userProfile?: string
            fullName: string
            text: string
          }) => console.log('check reply, ', data)}
          onEditAction={(data: any) => console.log('check edit', data)}
          cancelBtnStyle={{
            border: '1px solid gray',
            backgroundColor: 'gray',
            color: 'white'
          }}
          replyInputStyle={{ borderBottom: '1px solid black', color: 'black' }}
        />
      </div>
    ) : <CommentSection
      currentUser={{
        currentUserId: "guest",
        currentUserImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p_svIjwA810BURgFBTU0V6fNjiU9MRbUXQ&s",
        currentUserProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
        currentUserFullName: "random"
      }}
      commentData={[]}
      onSubmitAction={() => {
      }}
      customNoComment={customNoComment}
      logIn={{
        loginLink: 'http://localhost:3001/',
        signupLink: 'http://localhost:3001/'
      }}
    />
  );
};


