const url = "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20"
const parkingdiv = document.getElementById("parkingData")

async function getData() {
    try {
        
        const response = await fetch(url);
        if (!response.ok){
            throw new Error(`http error: ${response.status}`);
        }
        const data = await response.json();
        const parkings = data.results;
        console.log(parkings[0].name);
        displayData(parkings);

    } catch (error) {

        console.error("something went wrong with with loading data", error);
        document.getElementById("parkingData").innerHTML=`<p style = "color:red;">Oops... There's a problem come back later.</p>`;

    } finally {

        console.log("getData finished")

    }

};

function displayData(parkings) {
    console.log(`My parkings to display:`, parkings);
    parkings.forEach(parking => {
        const { occupation, totalcapacity, name, isopennow } = parking;
        let statusText = isopennow ? "Open" : "Closed"; 
        let statusClass = isopennow ? "open" : "closed"; 

        console.log(`Occupation: ${occupation} | Capacity: ${totalcapacity} | Parking name: ${name} | Status: ${statusText}`);
        const parkingCard = document.createElement("div");
        parkingCard.className = "Parking";
        parkingCard.innerHTML = `
        <h2>${name}</h2>
        <p>Bezetting ${occupation}</p>
        <p>Capaciteit ${totalcapacity}</p>
        <p>Status: <span class="${statusClass}">${statusText}</span></p>
        `;
        parkingdiv.appendChild(parkingCard);
    });
}




getData();