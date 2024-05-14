import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, get, set, ref, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyAqFWPyZVYy1lCboqQcKj7LpyjyjOY9TAI",
    authDomain: "swis-4333b.firebaseapp.com",
    databaseURL: "https://swis-4333b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "swis-4333b",
    storageBucket: "swis-4333b.appspot.com",
    messagingSenderId: "749781434804",
    appId: "1:749781434804:web:0b620b13a077f8490032e1"
  };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const db = getDatabase(app);

    const temperature = ref(db, 'temperature');
    const humidity = ref(db, 'humidity');
    const moisture = ref(db, 'Moisture');
    const watersupply = ref(db, 'Waterpump');
    const speed = ref(db, 'Speed');
    const mode = ref(db, 'write/mode');

    var dataValue

    console.log(document);

    const connectedRef = ref(db, ".info/connected");
    onValue(connectedRef, (snap) => {
    	if (snap.val() === true) {
    		console.log("connected");
    	} else {
    		console.log("not connected");
    	}
    });

    onValue(moisture, (snapshot) => {
    	const data = snapshot.val();
    	console.log(data);
        const dataContainer = document.getElementById('moisture');
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
    });

    onValue(temperature, (snapshot) => {
    	const data = snapshot.val();
    	console.log(data);
        const dataContainer = document.getElementById('temperature');
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
    });

    onValue(mode, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const dataContainer = document.getElementById('mode-toggle');
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
        dataValue = data;
    });

    onValue(watersupply, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const dataContainer = document.getElementById('water-supply-toggle');
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
    });

    onValue(speed, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const dataContainer = document.getElementById('speed');
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
    });


function writeModeData() {
  const db = getDatabase();
    console.log(dataValue);
  if ( dataValue == 3) {
    console.log("it is off now");
    set(ref(db, '/write'), {
      mode : 2
    });
  }
  else {
    set(ref(db, '/write'), {
      mode : 3
    });
  }
}

writeModeData()



