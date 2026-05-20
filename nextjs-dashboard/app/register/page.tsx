import Link from "next/link";

export default function Register()
{
    return (
        <div>
            <form>
                <h2>Rejestracja</h2>
                <br/><br/>
                <label>Login:</label><br/>
                <input type="text" id="username" name="username" required/>
                <br/>
                <label>Email:</label><br/>
                <input type="email" id="email" name="email" required/>
                <br/>
                <label>Hasło:</label><br/>
                <input type="password" id="password" name="password" required/>
                <br/><br/>
                <button type="submit">Zarejestruj się</button>
                <br/><br/><br/><br/>
            </form>

        </div>
    )
}