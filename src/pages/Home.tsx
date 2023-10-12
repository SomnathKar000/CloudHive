import { useEffect } from "react";
import UploadBox from "../components/UploadBox";
import FileList from "../components/FileList";
import Footer from "../layout/Footer";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserAsync } from "../redux/actions/userActions";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    else getUserAsync()(dispatch);
  }, [navigate, dispatch]);

  return (
    <>
      <Container>
        <FileList />
        <UploadBox />
      </Container>
      <Footer />
    </>
  );
};

export default Home;
