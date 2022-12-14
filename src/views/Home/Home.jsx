import { useEffect, useState, useContext } from "react";
import { Button, Container, createStyles, Loader } from "@mantine/core";
import { PostFeed } from "../../Components/PostFeed";
import { Sidebar } from "../../Components/Sidebar";
import CreatePost from "../../Components/CreatePost";
import { followinguserposts, HomePosts } from "../../api/GET";
import { AuthContext } from "../../context/Auth";
import { showNotification } from "@mantine/notifications";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  ClockCounterClockwise,
  Sparkle,
  UserList,
  WarningCircle,
} from "phosphor-react";
import Leaderboardhorizontal from "../../Components/Leaderboardhorizontal";

const useStyles = createStyles(() => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    paddingBottom: "5rem",
    paddingTop: "0.5rem",
    "@media (max-width: 700px)": {
      paddingTop: "0rem",
    },
  },
  leftWrapper: {
    width: "100%",
    flex: 0.7,
    "@media (max-width: 700px)": {
      flex: 1,
    },
  },
  sortby: {
    borderRadius: "4px",
    "@media (max-width: 700px)": {
      borderRadius: "0px",
    },
  },
}));
export const Home = () => {
  const { classes } = useStyles();
  const [homePosts, setHomePosts] = useState([]);
  const { UserInfo, darkmode } = useContext(AuthContext);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(0);
  const [postCount, setpostCount] = useState(0);

  const [sortby, setsortby] = useState("Latest");
  useEffect(() => {
    setsortby("Latest");
  }, [UserInfo]);
  useEffect(() => {
    setpage(0);
    setloading(true);
    if (sortby === "Following") {
      followinguserposts(0)
        .then((res) => {
          setHomePosts(res.data.homeposts);
          setloading(false);
          setpostCount(res.data.postCount);
        })
        .catch((err) => {
          if (err.response.status === 0) {
            showNotification({
              icon: <WarningCircle size={18} />,
              color: "red",
              title: "Internal Server Error",
              autoClose: 4000,
            });
          } else {
            showNotification({
              icon: <WarningCircle size={18} />,
              color: "red",
              title: err.response.data,
              autoClose: 4000,
            });
          }
        });
    } else {
      HomePosts(0, sortby)
        .then((res) => {
          setHomePosts(res.data.homeposts);
          setloading(false);
          setpostCount(res.data.postCount);
        })
        .catch((err) => {
          if (err.response.status === 0) {
            showNotification({
              icon: <WarningCircle size={18} />,
              color: "red",
              title: "Internal Server Error",
              autoClose: 4000,
            });
          } else {
            showNotification({
              icon: <WarningCircle size={18} />,
              color: "red",
              title: err.response.data,
              autoClose: 4000,
            });
          }
        });
    }
  }, [sortby]);
  const fetchMoreData = () => {
    setpage((prev) => prev + 1);
    if (sortby === "Following") {
      followinguserposts(page + 1)
        .then((res) => {
          setHomePosts((prev) => [...prev, ...res.data.homeposts]);
        })
        .catch((err) => {
          if (err.response.status === 0) {
            showNotification({
              icon: <WarningCircle size={18} />,
              color: "red",
              title: "Internal Server Error",
              autoClose: 4000,
            });
          } else {
            showNotification({
              icon: <WarningCircle size={18} />,
              color: "red",
              title: err.response.data,
              autoClose: 4000,
            });
          }
        });
    } else {
      HomePosts(page + 1, sortby)
        .then((res) => {
          setHomePosts((prev) => [...prev, ...res.data.homeposts]);
        })
        .catch((err) => {
          if (err.response.status === 0) {
            showNotification({
              icon: <WarningCircle size={18} />,
              color: "red",
              title: "Internal Server Error",
              autoClose: 4000,
            });
          } else {
            showNotification({
              icon: <WarningCircle size={18} />,
              color: "red",
              title: err.response.data,
              autoClose: 4000,
            });
          }
        });
    }
  };

  return (
    <>
      <Container px={0} className={classes.wrapper}>
        <div className={classes.leftWrapper}>
          {" "}
          {UserInfo && <CreatePost darkmode={darkmode} UserInfo={UserInfo} />}
          {UserInfo && (
            <div
              className={classes.sortby}
              style={{
                display: "flex",
                gap: "0.3rem",
                padding: "1rem 0.5rem",
                backgroundColor: darkmode ? "#1A1B1E" : "white",
                marginBottom: "0.5rem ",
              }}
            >
              <Button
                leftIcon={<ClockCounterClockwise size={20} />}
                onClick={() => setsortby("Latest")}
                variant={sortby === "Latest" ? "filled" : "subtle"}
                size="xs"
                radius={"xl"}
                color={"gray"}
              >
                Latest
              </Button>
              <Button
                leftIcon={<Sparkle size={20} />}
                onClick={() => setsortby("Popular")}
                variant={sortby === "Popular" ? "filled" : "subtle"}
                size="xs"
                radius={"xl"}
                color={"gray"}
              >
                Popular
              </Button>

              <Button
                leftIcon={<UserList size={20} />}
                onClick={() => setsortby("Following")}
                variant={sortby === "Following" ? "filled" : "subtle"}
                size="xs"
                radius={"xl"}
                color={"gray"}
              >
                Following
              </Button>
            </div>
          )}
          <Leaderboardhorizontal />
          <InfiniteScroll
            dataLength={homePosts.length}
            next={fetchMoreData}
            hasMore={postCount > homePosts.length}
            loader={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <Loader />
              </div>
            }
            endMessage={
              <>
                {/* <Text
                  style={{
                    marginTop: "1rem",
                  }}
                  align="center"
                  color={darkmode ? "white" : "dark"}
                >
                  You have seen it all
                </Text> */}
              </>
            }
          >
            <PostFeed
              setPosts={setHomePosts}
              posts={homePosts}
              loading={loading}
            />
          </InfiniteScroll>
        </div>
        <Sidebar />
      </Container>
    </>
  );
};
