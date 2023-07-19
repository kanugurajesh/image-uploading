import Image from 'next/image'
import styles from './page.module.css'
// import id creator
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkbox, setCheckbox] = useState(false)
  const [image, setImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
  
    const formData = {
      name,
      email,
      password,
      checkbox,
    }

    console.log(formData)
  }


  return (
    <div className={styles.container}>
      <h1>Form</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" onChange={
            (e) => setName(e.target.value)
          }/>
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" onChange={
            (e) => setEmail(e.target.value)
          }/>
        </label>
        <br />
        <label>
          Password:
          <input type="text" name="password" onChange={
            (e) => setPassword(e.target.value)
          }/>
        </label>
        <br />
        <label>
          <input type="checkbox" name="checkbox" onChange={
            (e) => setCheckbox(e.target.checked)
          }/>
          I agree to the terms and conditions
        </label>
        <br />
        <input type="submit" value="Submit" onClick={
          (e) => handleSubmit(e)
        }/>
        <input type="file" name="image" onChange={
          (e) => setImage(e.target.files[0])
        }/>
      </form>
    </div>
  )
}