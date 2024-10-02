import { useState } from "react";
import { getAllSubscriptionsByUserId } from "../../Managers/SubscriptionManager.js";

export const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  
  const SubscriptionList = () => {
    getAllSubscriptionsByUserId().then((postArr) => setSubscriptions(postArr));
  };

  return <></>;
};
