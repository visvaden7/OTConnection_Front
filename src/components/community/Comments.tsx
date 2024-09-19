import {FunctionComponent, useEffect, useState} from 'react';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';
import {useAuth} from "../../hooks/useAuth.ts";
import axios from "axios";
import {API_ENDPOINT} from "../../assets/const/constant.ts";

interface commentType
{
  userId: string;
  comId: string;
  avatarUrl: string;
  userProfile?: string;
  fullName: string;
  text: string;
  replies: any;
}

interface Props {
  postId: string
}

export const Comments:FunctionComponent<Props> = ({postId}) => {
  const [data, setData] = useState<commentType[]>([
    {
      userId: '01a',
      comId: '012',
      fullName: 'Riya Negi',
      avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'Hey, Loved your blog! ',
      replies: []
    },
    {
      userId: '02b',
      comId: '017',
      fullName: 'Lily',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'I have a doubt about the 4th point🤔',
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      replies: []
    }
  ]);
  
  const getComments = async (postId:number) => {
    const response = await axios.get<commentType>(`${API_ENDPOINT}/comments/${postId}`)
    console.log(response.data)
    // setData(response.data)
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
    replies: any;
  }) => {
    try {
      // 새로운 댓글을 서버에 추가
      const response = await axios.post(`${API_ENDPOINT}/comments`, {
        post_Id: postId,
        ...commentData,
      });
      
      // 서버로부터 성공적으로 응답을 받으면 상태를 업데이트
      setData([...data, response.data]); // 서버에서 저장된 댓글을 받아서 추가
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
        commentData={data}
        onSubmitAction={onSubmitAction}
        customNoComment={customNoComment}
        logIn={{
          loginLink: 'http://localhost:3001/',
          signupLink: 'http://localhost:3001/'
        }}
      />
    </div>
    ): <CommentSection
      currentUser={{
        currentUserId: "guest",
        currentUserImg: "random",
        currentUserProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
        currentUserFullName: "random"
      }}
      commentData={[]}
      onSubmitAction={() => {}}
      customNoComment={customNoComment}
      logIn={{
        loginLink: 'http://localhost:3001/',
        signupLink: 'http://localhost:3001/'
      }}
    />
  );
};


