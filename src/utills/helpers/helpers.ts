// import {
//   FolderZip,Description
// } from "@mui/icons-material";

const formatTime = (time: string): string => {
  try {
    const data = new Date(time);
    if (isNaN(data.getTime())) {
      return "Invalid Date";
    }
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let howers = data.getUTCHours();
    const minutes = data.getUTCMinutes();
    const month = months[data.getMonth()];
    const year = data.getFullYear();
    const date = data.getDate();
    let meridiem = "AM";
    if (howers >= 12) {
      meridiem = "PM";
      if (howers > 12) howers -= 12;
    }

    return ` ${month} ${date}, ${year}, ${howers}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${meridiem}`;
  } catch (error) {
    return "Invalid Date";
  }
};

const getFileType = (file: File): string => {
  return file.type.split("/")[1];
};

export { formatTime, getFileType };
