const loginForm = document.querySelector('#loginForm');
const loginFormInputs = document.querySelectorAll('#loginForm input');
const buttons = document.querySelectorAll("#controlPannel button");
const infoTable = document.querySelectorAll('#tableInfo td');
const addUserForm = document.querySelector('#add-user-form');
const addUserFormInputs = document.querySelectorAll('#add-user-form input');
const updateUserForm = document.querySelector('#updateForm');
const updateUserFormInputs = document.querySelectorAll('#updateForm input');
const userList = document.querySelector('#user_list');
const uiInfo = document.querySelectorAll('#uiInfo p');
const databaseReference = db.collection('Users');
const updateButton = document.querySelector('#btn_update');
const sessionForm = document.querySelector('#sessionForm');

var counter = new Array(20).fill(0);
var snapshotp;
var documentReference;
var len = buttons.length;
var last;
var lastBg;


for(let i=5;i<19;i++){
    buttons[i].disabled = true;
}
updateButton.disabled = true;

databaseReference.orderBy('donateTimes', 'desc').onSnapshot(snapshot => {
    last = 'all';
    snapshotp = snapshot;
    counter.fill(0);
    clear();
    snapshot.docs.forEach(doc => {
        count(doc);
        renderUsers(doc);
    });
    counterTable();
});


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = loginFormInputs[0].value;
    let password = loginFormInputs[1].value;

    mAuth.signInWithEmailAndPassword(email, password).then(() => {
        alert("Admin Logged In");
    });
});

addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
        databaseReference.add({
            fullName: addUserFormInputs[0].value,
            bloodGroup: addUserFormInputs[1].value,
            phoneNumber: addUserFormInputs[2].value,
            homeDistrict: addUserFormInputs[3].value,
            department: addUserFormInputs[4].value,
            session: addUserFormInputs[5].value,
            donateTimes: parseInt(addUserFormInputs[6].value),
            status: addUserFormInputs[7].value,
            donarStatus: 'positive',
            formFactor: 'nonApp'
    }).then(() => {
        alert('Successfully Added Donar');
    });
});

updateUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateButton.disabled = true;
    documentReference.update({
        fullName: updateUserFormInputs[0].value,
        bloodGroup: updateUserFormInputs[1].value,
        phoneNumber: updateUserFormInputs[2].value,
        homeDistrict: updateUserFormInputs[3].value,
        department: updateUserFormInputs[4].value,
        session: updateUserFormInputs[5].value,
        donateTimes: parseInt(updateUserFormInputs[6].value),
        status: updateUserFormInputs[7].value,
    }).then(() => {
        alert('Update Successful');
    });
});

sessionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let session = document.getElementById('session').value;
    snapshotp.docs.forEach(doc => {
        if(doc.data().session == session){
            renderUsers(doc);
        }
    });

});

for(let i=1;i<len;i++){
    buttons[i].addEventListener('click', function(){
        counter[19] = 0;
        clear();
        switch(this.innerHTML){
            case 'All':
                last = 'all';
                uiInfo[0].innerHTML = 'All';
                uiInfo[1].innerHTML = '';
                uiInfo[3].innerHTML = '';
                updateUi();
                snapshotp.docs.forEach(doc => {
                    renderUsers(doc);
                });
                break;
            case 'App':
                last = 'app';
                uiInfo[0].innerHTML = 'App';
                uiInfo[1].innerHTML = '';
                uiInfo[3].innerHTML = '';
                updateUi();
                snapshotp.docs.forEach(doc => {
                    if(doc.data().formFactor == 'app'){
                        renderUsers(doc);
                    }
                });
                break;
            case 'Non App':
                last = 'nonApp';
                uiInfo[0].innerHTML = 'Non App';
                uiInfo[1].innerHTML = '';
                uiInfo[3].innerHTML = '';
                updateUi();
                snapshotp.docs.forEach(doc => {
                    if(doc.data().formFactor == 'nonApp'){
                        renderUsers(doc);
                    }
                });
                break;
            case 'Donar':
                uiInfo[3].innerHTML = 'Donar';
                uiInfo[2].innerHTML = '';
                uiInfo[1].innerHTML = '';
                switch(last){
                    case 'all':
                        snapshotp.docs.forEach(doc => {
                            if(doc.data().donarStatus == 'positive'){
                                renderUsers(doc);
                            }
                        });
                        break;
                    default:
                        snapshotp.docs.forEach(doc => {
                            if(doc.data().formFactor == last && doc.data().donarStatus == 'positive'){
                                renderUsers(doc);
                            }
                        });
                        break;
                }
                break;
            case 'Not Donar':
                uiInfo[3].innerHTML = 'Not Donar';
                uiInfo[2].innerHTML = '';
                uiInfo[1].innerHTML = '';
                switch(last){
                    case 'all':
                        snapshotp.docs.forEach(doc => {
                            if(doc.data().donarStatus == 'negative'){
                                renderUsers(doc);
                            }
                        });
                        break;
                    case 'app':
                        snapshotp.docs.forEach(doc => {
                            if(doc.data().formFactor == 'app' && doc.data().donarStatus == 'negative'){
                                renderUsers(doc);
                            }
                        });
                        break;
                }
                break;
            case "A+":
                lastBg = 'A+';
                uiInfo[1].innerHTML = 'A+';
                uiInfo[2].innerHTML = '';
                uiInfo[3].innerHTML = 'Donar';
                render('A+');
                 break;
            case "B+":
                lastBg = 'B+';
                uiInfo[1].innerHTML = 'B+';
                uiInfo[2].innerHTML = '';
                uiInfo[3].innerHTML = 'Donar';
                render('B+');
                break;
            case "AB+":
                lastBg = 'AB+';
                uiInfo[1].innerHTML = 'AB+';
                uiInfo[2].innerHTML = '';
                uiInfo[3].innerHTML = 'Donar';
                render('AB+');
                break;
            case "O+":
                lastBg = 'O+';
                uiInfo[1].innerHTML = 'O+';
                uiInfo[2].innerHTML = '';
                uiInfo[3].innerHTML = 'Donar';
                render('O+');
                break;
            case "A-":
                lastBg = 'A-';
                uiInfo[1].innerHTML = 'A-';
                uiInfo[2].innerHTML = '';
                uiInfo[3].innerHTML = 'Donar';
                render('A-');
                break;
            case "B-":
                lastBg = 'B-';
                uiInfo[1].innerHTML = 'B-';
                uiInfo[2].innerHTML = '';
                uiInfo[3].innerHTML = 'Donar';
                render('B-');
                break;
            case "AB-":
                lastBg = 'AB-';
                uiInfo[1].innerHTML = 'AB-';
                uiInfo[2].innerHTML = '';
                uiInfo[3].innerHTML = 'Donar';
                render('AB-');
                break;
            case "O-":
                lastBg = 'O-';
                uiInfo[1].innerHTML = 'O-';
                uiInfo[2].innerHTML = '';
                uiInfo[3].innerHTML = 'Donar';
                render('O-');
                break;
            case 'Available':
                uiInfo[2].innerHTML = 'Available';
                availNonAvail('Available', 'p');
                break;
            case 'Unavailable':
                uiInfo[2].innerHTML = 'Unavailable';
                availNonAvail('Unavailable', 'p');
                break;
            case 'Available All':
                uiInfo[1].innerHTML = '';
                uiInfo[2].innerHTML = 'Available';
                availNonAvail('Available', 'x');
                break;
            case 'Unavailable All':
                uiInfo[1].innerHTML = '';
                uiInfo[2].innerHTML = 'Unavailable';
                availNonAvail('Unavailable', 'x');
                break;
            case "Logout":
                mAuth.signOut().then(() => {
                    alert("Admin signed out");
                });
                break;
        }
    });
}

function renderUsers(doc){
    counter[19]++;
    let tr = document.createElement('tr');
    let num = document.createElement('td');
    let name = document.createElement('td');
    let bloodGroup = document.createElement('td');
    let phoneNumber = document.createElement('td');
    let homeDistrict = document.createElement('td');
    let department = document.createElement('td');
    let session = document.createElement('td');
    let donateTimes = document.createElement('td');
    let status = document.createElement('td');
    let edit = document.createElement('button');
    let btn_delete = document.createElement('button');

    let namex = doc.data().fullName;
    let bloodGroupx = doc.data().bloodGroup;
    let phoneNumberx = doc.data().phoneNumber;
    let homeDistrictx = doc.data().homeDistrict;
    let departmentx = doc.data().department;
    let sessionx = doc.data().session;
    let donateTimesx = doc.data().donateTimes;
    let statusx = doc.data().status;

    tr.setAttribute('data-id', doc.id);
    num.textContent = counter[19];
    name.textContent = namex;
    bloodGroup.textContent = bloodGroupx;
    phoneNumber.textContent = phoneNumberx;
    homeDistrict.textContent = homeDistrictx;
    department.textContent = departmentx;
    session.textContent = sessionx;
    donateTimes.textContent = donateTimesx;
    status.textContent = statusx;
    edit.innerHTML = "Edit";
    edit.id = doc.id;
    edit.addEventListener("click", function(){
        updateButton.disabled = false;
        updateUserFormInputs[0].value = namex;
        updateUserFormInputs[1].value = bloodGroupx;
        updateUserFormInputs[2].value = phoneNumberx;
        updateUserFormInputs[3].value = homeDistrictx;
        updateUserFormInputs[4].value = departmentx;
        updateUserFormInputs[5].value = sessionx;
        updateUserFormInputs[6].value = donateTimesx;
        updateUserFormInputs[7].value = statusx;
        documentReference = databaseReference.doc(this.id);  
    });
    btn_delete.innerHTML = "Delete";
    btn_delete.id = doc.id;
    btn_delete.addEventListener("click", function(){
        alert('Are you sure you want to delete user ' + doc.data().fullName);
        databaseReference.doc(this.id).delete();
    });

    tr.appendChild(num);
    tr.appendChild(name);
    tr.appendChild(bloodGroup);
    tr.appendChild(phoneNumber);
    tr.appendChild(homeDistrict);
    tr.appendChild(department);
    tr.appendChild(session);
    tr.appendChild(donateTimes);
    tr.appendChild(status);
    tr.appendChild(edit);
    tr.appendChild(btn_delete);

    userList.appendChild(tr);

}

function clear(){
    userList.innerHTML = "";
    userList.innerHTML = "<tr><th>SL.</th><th>Name</th><th>Blood Group</th><th>Phone Number</th><th>Home District</th><th>Department</th><th>Session</th><th>Donation Times</th><th>Status</th></tr>"
}

function count(doc){
    counter[0]++;
    if(doc.data().donarStatus == 'positive'){
        counter[17]++;
        switch(doc.data().bloodGroup){
            case 'A+':
                counter[1]++;
                if(doc.data().status == 'Available'){
                    counter[9]++;
                    counter[18]++;
                }
                break;
            case 'B+':
                counter[2]++;
                if(doc.data().status == 'Available'){
                    counter[10]++;
                    counter[18]++;
                }
                break;
            case 'AB+':
                counter[3]++;
                if(doc.data().status == 'Available'){
                    counter[11]++;
                    counter[18]++;
                }
                break;
            case 'O+':
                counter[4]++;
                if(doc.data().status == 'Available'){
                    counter[12]++;
                    counter[18]++;
                }
                break;
            case 'A-':
                counter[5]++;
                if(doc.data().status == 'Available'){
                    counter[13]++;
                    counter[18]++;
                }
                break;
            case 'B-':
                counter[6]++;
                if(doc.data().status == 'Available'){
                    counter[14]++;
                    counter[18]++;
                }
                break;
            case 'AB-':
                counter[7]++;
                if(doc.data().status == 'Available'){
                    counter[15]++;
                    counter[18]++;
                }
                break;
            case 'O-':
                counter[8]++;
                if(doc.data().status == 'Available'){
                    counter[16]++;
                    counter[18]++;
                }
                break;
        }
    }    
}

function counterTable(){
    infoTable[1].innerHTML = counter[0];
    infoTable[3].innerHTML = counter[17];
    infoTable[5].innerHTML = counter[18];
    infoTable[8].innerHTML = counter[1];
    infoTable[10].innerHTML = counter[9];
    infoTable[13].innerHTML = counter[2];
    infoTable[15].innerHTML = counter[10];
    infoTable[18].innerHTML = counter[3];
    infoTable[20].innerHTML = counter[11];
    infoTable[23].innerHTML = counter[4];
    infoTable[25].innerHTML = counter[12];
    infoTable[28].innerHTML = counter[5];
    infoTable[30].innerHTML = counter[13];
    infoTable[33].innerHTML = counter[6];
    infoTable[35].innerHTML = counter[14];
    infoTable[38].innerHTML = counter[7];
    infoTable[40].innerHTML = counter[15];
    infoTable[43].innerHTML = counter[8];
    infoTable[45].innerHTML = counter[16];
}

function render(bg){
    buttons[15].disabled = false;
    buttons[16].disabled = false;
    snapshotp.docs.forEach(doc => {
        if(last == 'all') {
            if(doc.data().bloodGroup == bg){
                renderUsers(doc);
            }
        } else {
            if(doc.data().formFactor == last && doc.data().bloodGroup == bg){
            renderUsers(doc);
            }
        }
    });
}

function availNonAvail(stat, detector){
    if(detector == 'x'){
        buttons[15].disabled = true;
        buttons[16].disabled = true;
        snapshotp.docs.forEach(doc => {
            if(last == 'all'){
                if(doc.data().status == stat){
                    renderUsers(doc);
                }
            }
            else{
                if(doc.data().formFactor == last && doc.data().status == stat){
                    
                    renderUsers(doc);
                }
            }
        });
    } else {
        snapshotp.docs.forEach(doc => {
            if(last == 'all'){
                if(doc.data().bloodGroup == lastBg && doc.data().status == stat){
                    renderUsers(doc);
                }
            }
            else{
                if(doc.data().formFactor == last && doc.data().bloodGroup == lastBg && doc.data().status == stat){
                    renderUsers(doc);
                }
            }
        });
    }
}

function updateUi(){
    for(let i=5;i<15;i++){
        buttons[i].disabled = false;
    }
    buttons[15].disabled = true;
    buttons[16].disabled = true;
    buttons[17].disabled = false;
    buttons[18].disabled = false;

    if(last == 'nonApp'){
        buttons[5].disabled = true;
        buttons[6].disabled = true;
    }
}
