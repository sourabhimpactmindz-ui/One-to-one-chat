import { useState } from "react";
import { createUser } from "../service/userservice/userservice";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const Create = () => {
    const [form , setform] = useState("")
    const navigate = useNavigate()

    const handleinp = (e) =>{
        setform({
            ...form , [e.target.name] : e.target.value
        })
    }


    const handlecreate = async(e) =>{
        e.preventDefault()
        const res = await createUser(form)
        const {status} = res
        if(status){
            toast.success("account is created")
            navigate('/')
        }
        else{
            toast.error("user not created")
        }
    }

  return (
    <div className="form-container">
      <h2>Create Account</h2>

      <form className="form-box">
        <div className="form-group">
          <label>Name</label>
          <input type="text"  name="name" placeholder="Enter your name"  onChange={handleinp} />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input type="number" name='age' placeholder="Enter your age"  onChange={handleinp} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter password"  onChange={handleinp} />
        </div>

        <button type="submit" onClick={handlecreate}>Create</button>
      </form>
    </div>
  );
};

export default Create;
