import './Profile.css';

const user = localStorage.getItem('username');

function Profile() {
    return (
        <div className="Profile">
            <div className="Profile-Title">
                <h2><i>"<b>{user}</b>"</i> Profile</h2>
            </div>

        </div>
    );
}

export default Profile;