import Input from "../../shared/components/FormElemets/Input";
import "./NewPlace.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElemets/Button";
import { useForm } from "../../shared/hooks/form-hook";


const NewPlace = () => {
  const [formState,InputHandler] =useForm({
    title:{
      value:'',
      isValid:'',
    },
    description:{
      value:'',
      isValid:'',
    },
    address:{
      value:'',
      isValid:'',
    }
  },false)
  
  
  const placeSubmitHandler= event =>{
    event.preventDefault();
    console.log(formState.inputs)
  };
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title {at least 5 characters}"
        onInput={InputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description"
        onInput={InputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description"
        onInput={InputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD Place
      </Button>
    </form>
  );
};
export default NewPlace;
