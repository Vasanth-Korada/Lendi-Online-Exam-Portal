import firebase from '../firebase';
const testRef = firebase.firestore().collection('tests');
export const getAllExams = async () => {
	const allExams = [];
	await testRef.get().then((querySnapshot) => {
		querySnapshot.docs.forEach((doc) => {
			allExams.push(doc.data());
		});
	});
	console.log('getAllExams func');
	console.log(allExams);
	return allExams;
};

export const isAttempted = async (examId, username) => {
	var isAttempted;
	await firebase
		.firestore()
		.collection('tests')
		.doc(examId)
		.collection('participants')
		.doc(username)
		.get()
		.then((doc) => {
			const data = doc.data();
			isAttempted = data.isAttempted;
			console.log('User Attempted Active Exam', data.isAttempted);
		})
		.catch((e) => {
			isAttempted = false;
			console.log('User Attempted Active Exam', isAttempted);
		});
	console.log(isAttempted);
	return isAttempted;
};
