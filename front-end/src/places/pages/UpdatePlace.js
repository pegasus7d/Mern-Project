import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElemets/Input";
import Button from "../../shared/components/FormElemets/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;


  
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  const [formState,inputHandler]=useForm({
    title:{
      value:identifiedPlace.title,
      isValid:true
    },
    description:{
      value:identifiedPlace.description,
      isValid:true
    },

  },true);
  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find Place</h2>
      </div>
    );
  }

  const placeSubmitHandler= event =>{
    event.preventDefault();
    console.log(identifiedPlace)
  };
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        value={formState.inputs.title.value}
        valid={formState.inputs.description.isValid}
      />
      <Input
        id="description"
        element="textarea"
        
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter valid Description least 5 characters"
        onInput={inputHandler}
        value={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={false}>UPDATE PLACE</Button>
      
    </form>
  );
};
export default UpdatePlace;
