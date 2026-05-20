import Link from "next/link";

export default function Login()
{
    return (
        <div className="form">
            <form>
                <h2>Logowanie</h2>
                <br/><br/>
                <label>Login:</label><br/>
                <input type="text" id="username" name="username" required/>
                <br/>
                <label>Hasło:</label><br/>
                <input type="password" id="password" name="password" required/>
                <br/><br/>
                <button type="submit">Zaloguj się</button>
                <br/><br/><br/><br/>
                <Link href={"/register"}>Nie masz konta? Zarejestruj się</Link>
            </form>
        </div>
    );
}