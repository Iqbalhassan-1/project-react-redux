import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import styles from './NoInternetAlert.module.css'
const NoInternetAlert = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatus = () => setOnline(navigator.onLine);
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  return (
    !online && (
      <Alert variant="danger" className={`text-center ${styles.no_internet_alert}`}>
        <Alert.Heading>Oops! No Internet Connection</Alert.Heading>
        <p>Please check your internet connection and try again.</p>
      </Alert>
    )
  );
};

export default NoInternetAlert;
