import { Button } from 'rsuite';
import Axios from 'axios';

function listFiles() {
    Axios.post("http://localhost:8080/files/each");
}

function Clientapk() {
    listFiles();
    return (
        <Button as="a" href="../../mobile-app/android/build/outputs/apk/*.apk" download>
            Download APK
        </Button>
    )
}

export default Clientapk;