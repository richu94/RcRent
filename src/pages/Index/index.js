import { Swiper,Skeleton,Card } from "antd-mobile"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { TabBar,Grid } from "antd-mobile"
import {ShopbagOutline,TeamOutline,CompassOutline,LocationOutline} from 'antd-mobile-icons'
import './index.scss'

export default function HomePage(){
    const [imageList,setImageList] = useState([])
    const [group,setGroup] = useState({})
    useEffect(()=>{
        const getSwipers = async ()=>{
            const res = await axios.get("http://localhost:8080/home/swiper")
            setImageList(res.data.body)
        }
        getSwipers()
    },[setImageList])
    useEffect(()=>{
      const getRentGroup = async ()=>{
        const res = await axios.get("http://localhost:8080/home/groups",{
          params: {
            area:'AREA%7C88cff55c-aaa4-e2e0'
            }
          }
        )
        setGroup({
          groups:res.data.body
        })
      }
      getRentGroup()
    },[setGroup])
    const tabs = [
      {
        key: 'totalrent',
        title: '整租',
        icon: <ShopbagOutline />,
      },
      {
        key: 'withrent',
        title: '合租',
        icon: <TeamOutline/>
      },
      {
        key: 'findrent',
        title: '地图找房',
        icon: <CompassOutline/>
      },
      {
        key: 'torent',
        title: '去出租',
        icon: <LocationOutline />,
      },
    ]
    const navigate = useNavigate()
    const items = imageList.map(image => (
        <Swiper.Item key={image.id} style={{backgroundColor:"white"}}>
          <img
            src={`http://localhost:8080${image.imgSrc}`}
            style={{height:"200px",width:"100%"}}
            onClick={() => {
              navigate("/")
            }}
            alt={`轮播图${image.id}`}
          />
        </Swiper.Item>
    ))
    return (
        <div className="navigatebar">
          <Swiper autoplay loop={true}>{items}</Swiper>
          <TabBar style={{marginTop:"10px"}}>
            {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
          <div className="group">
            <h3 className="text">租房小组</h3>
            <span className="more">更多</span>
          </div>
          <Grid columns={2} gap={8} className="detail">
           {group.groups == null ? <div>
            <Skeleton.Title />
            <Skeleton.Paragraph />
            </div>: 
            group.groups.map(item=>(<div className="groupdetail">
            <div className="groupdesc">
              <div className="title">{item.title}</div>
              <div className="desc">{item.desc}</div>
            </div>
            <img className="groupimg" src={`http://localhost:8080${item.imgSrc}`} alt={item.title}/>
          </div>)
            )}
        </Grid>
        <div className="news">
            <h3 style={{fontSize:"13px",marginLeft:"10px",marginTop:"6px"}}>最新资讯</h3>
            <div className="new" width="100%">
              <img className="img" src="https://s.cn.bing.net/th?id=OHR.ConnecticutBridge_ZH-CN4957862425_UHD.jpg"/>
              <div className="details">
                <h4 className="newtitle">最新</h4>
                <div className="message">
                  <div className="author">richu</div>
                  <div className="time">1天前</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
    )
}