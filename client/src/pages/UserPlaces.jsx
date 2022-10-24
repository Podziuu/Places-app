import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import PlaceList from "../components/PlaceList/PlaceList";
import ErrorModal from "../components/UI/ErrorModal";
import LoadingSpinner from "../components/UI/LoadingSpinnder";

const UserPlaces = () => {
  const params = useParams();
  const userId = params.userId;
  const navigate = useNavigate()
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [places, setPlaces] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setPlaces(data.places);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest]);

  const placeDeletedHandler =(deletedPlaceId) => {
    setPlaces((prev) => prev.filter((place) => place.id !== deletedPlaceId))
  }

  const clickHadnler = () => {
    clearError();
    navigate('/')
  }

  return (
    <>
      <ErrorModal error={error} onClear={clickHadnler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && <PlaceList places={places} onDeletePlace={placeDeletedHandler} />}
    </>
  );
};

export default UserPlaces;
