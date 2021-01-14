import firebase from "../firebase";

//2. register
//3. catchValue
//4. logout
//5. checkActiveSession

//Actions Creators
export const setUser = (userObj) => {
  //Una vez que el usuario inicie sesión guardarmos los datos del usuario en el store
  return {
    type: "SET_USER",
    userObj,
  };
};

export const login = (provider, email, password) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (provider === "email") {
          let { user } = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
          //console.log(user);
          dispatch(setUser(user));
        } else {
          if (provider === "google") {
            let googleProvider = new firebase.auth.GoogleAuthProvider();
            let { user } = await firebase
              .auth()
              .signInWithPopup(googleProvider);
            //console.log(user);
            dispatch(setUser(user));
            //console.log(user);
            getUsers(user.email, user.displayName, "", user.uid, user.photoURL);
          }
          if (provider === "facebook") {
            let facebookProvider = new firebase.auth.FacebookAuthProvider();
            let { user, credential } = await firebase
              .auth()
              .signInWithPopup(facebookProvider);
            let userupdt = firebase.auth().currentUser;
            userupdt.updateProfile({
              photoURL:
                `https://graph.facebook.com/${user.providerData[0].uid}/picture?access_token=${credential.accessToken}`,
            });
            //console.log(user);
            dispatch(setUser(user));
            //console.log(user);
            getUsers(user.email, user.displayName, "", user.uid, user.photoURL);
          }
        }
        resolve(true);
      } catch (error) {
        //console.log(error);
        reject(error);
      }
    });
  };
};

export const Register = (email, password, name, lastname, namec) => {
  return (dispatch, state) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        let userupdt = firebase.auth().currentUser;
        userupdt.updateProfile({
          displayName: name + "  " + lastname,
          photoURL:
            "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
        });
        postNewUser(email, name, lastname, user.uid, "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png");
        dispatch(setUser(user));

        resolve(true);
      } catch (error) {
        //console.log(error);
        reject(error);
      }
    });
  };
};
export const forgotPassword = (email) => {
  return () => {
    return new Promise(async (resolve, reject) => {
      try {
        var auth = firebase.auth();
        await auth.sendPasswordResetEmail(email);
        resolve(true);
      } catch (error) {
        //console.log(error);
        reject(error);
      }
    });
  };
};

export const logout = (sesionactive) => {
  firebase.auth().signOut();

  return {
    type: "LOGOUT_SYSTEM",
    sesionactive,
  };
};

export const checkActiveSession = (sesionactive) => {
  return {
    type: "CHECK_ACTIVE_SESSION",
    sesionactive,
  };
};

export const getUsers = async (email, name, lastname, uid, photoURL) => {
  let response = await fetch(`https://academlo-whats.herokuapp.com/api/v1/users`);
  let responseJ = await response.json();
  let findUser = responseJ.find(user => user.uid === uid );
  if(findUser){

  }
  else{ postNewUser(email, name, lastname, uid, photoURL);}
  console.log(responseJ);
}

export const postNewUser = async (email, name, lastname, uid, photoURL) => {
  let response = await fetch(
    `https://academlo-whats.herokuapp.com/api/v1/users`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: name,
        lastName: lastname,
        email: email,
        uid: uid,
        username: name + " " + lastname,
        photoUrl: photoURL,
          //"https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
      }),
    }
  );
  let results = await response.json();
  //console.log(results);
  return results;
};
