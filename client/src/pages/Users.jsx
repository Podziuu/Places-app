import React, { useEffect, useState } from "react";
import UserList from "../components/UserList/UserList";
import ErrorModal from "../components/UI/ErrorModal";
import LoadingSpinner from "../components/UI/LoadingSpinnder";
import { useHttpClient } from "../hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest(import.meta.env.VITE_BACKEND_URL + "/users");

        setLoadedUsers(data.users);
      } catch (err) {
      }
    };
    fetchUsers();
  }, [sendRequest]);


  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList users={loadedUsers} />}
    </>
  );
};

export default Users;
