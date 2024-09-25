import {FunctionComponent, useCallback, useEffect, useState} from "react";
import {Button} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {API_ENDPOINT} from "../../const/constant.ts";
import axios from "axios";
import {ResponseCheckFavorite} from "../../@types/api.ts";
import {useAuth} from "../../context/AuthContext.tsx";

interface Props {
  ip_id: number;
}

export const IpFavorite: FunctionComponent<Props> = ({ip_id}) => {
  const {user, setIsModalOpen} = useAuth();
  const [isActive, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const updateFavorite = useCallback(({active, count}: { count: number, active: boolean }) => {
    setCount(count);
    setActive(active);
  }, []);
  const getFavoriteInfo = useCallback(async () => {
    try {
      const url = `${API_ENDPOINT}/favorite/check_favorite`
      const response = await axios.get<ResponseCheckFavorite>(url, {
        params: {
          user_id: user?.user_id,
          ip_id,
        }
      })
      updateFavorite(response.data);
    } catch (err) {
      console.log("err :", err)
    }
  }, [ip_id]);
  
  const setFavorite = useCallback(async () => {
    if (!user) {
      setIsModalOpen(true)
      return;
    }
    try {
      const url = `${API_ENDPOINT}/favorite`
      const response = await axios.post<ResponseCheckFavorite>(url, {
        user_id: user?.user_id,
        ip_id,
      })
      updateFavorite(response.data);
    } catch (err) {
      console.log("err :", err)
    }
  }, []);
  
  const unsetFavorite = useCallback(async () => {
    try {
      const url = `${API_ENDPOINT}/favorite`
      const response = await axios.delete<ResponseCheckFavorite>(url, {
        params: {
          user_id: user?.user_id,
          ip_id,
        }
      })
      updateFavorite(response.data);
    } catch (err) {
      console.log("err :", err)
    }
  }, []);
  useEffect(() => {
    void getFavoriteInfo();
  }, []);
  return (
    <div>
      {isActive ? (
        <Button type={"default"} icon={<HeartFilled style={{color: "red"}}/>} style={{
          borderRadius: "40px",
          marginLeft: "10px"
        }} onClick={unsetFavorite}>{count}</Button>
      ) : (
        <Button type={"default"} icon={<HeartOutlined/>}
                style={{borderRadius: "40px", marginLeft: "10px"}}
                onClick={setFavorite}>찜하기
        </Button>
      )}
    </div>
  )
}

// import {Favorite} from "../../@types/domain.ts";
// import {FunctionComponent} from "react";
// import axios from "axios";
// import {Button} from "antd";
// import {HeartFilled, HeartOutlined} from "@ant-design/icons";
// import {User} from "../../@types/user.ts";
//
// interface Props {
//   favorite?: Favorite;
//   title: string;
//   user: User;
//   ip_id: string
// }
//
// export const IpFavorite: FunctionComponent<Props> = ({favorite, title, user, ip_id}) => {
//
//   const handleFavoriteClick = async () => {
//     try {
//       console.log("test", user.user_id)
//       if (user) {
//
//         const response = await axios.post('http://localhost:8001/api/favorite', {
//           user_id: user?.user_id,
//           ip_id: ip_id
//         })
//         console.log(response.data)
//       }
//     } catch (err) {
//       alert("로그인 해주세요")
//       console.log("찜하기 처리 중 오류 발생", err)
//     }
//   }
//
//   const handleDeleteFavoriteClick = async () => {
//     try {
//       if (user) {
//         const response = await axios.delete('http://localhost:8001/api/favorite', {
//           data: {
//             user_id: user?.user_id,
//             ip_id: ip_id
//           }
//         })
//         console.log(response.data)
//       }
//     } catch (err) {
//       alert("로그인 해주세요")
//       console.log("찜하기 처리 중 오류 발생", err)
//     }
//   }
//
//   return(
//   <div className={"name-and-like"}>
//     <div>{title}</div>
//     {favorite?.is_favorite && user ? <Button type={"default"} icon={<HeartFilled style={{color: "red"}}/>} style={{
//         borderRadius: "40px",
//         marginLeft: "10px"
//       }} onClick={handleDeleteFavoriteClick}>{favorite.count}</Button>
//       : <Button type={"default"} icon={<HeartOutlined/>}
//                 style={{borderRadius: "40px", marginLeft: "10px"}}
//                 onClick={handleFavoriteClick}>찜하기
//       </Button>}
//   </div>
//   )
// }