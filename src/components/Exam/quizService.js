import firebase from '../../firebase';
const qBank = [];

export default async (exam_total_questions, exam_id) => {
	console.log(exam_id);
	console.log(exam_total_questions);
	await firebase.firestore().collection('tests').doc(exam_id).get().then((doc) => {
		const data = doc.data();
		qBank.push(data.questions);
		// console.log(qBank);
	});
	return Promise.resolve(qBank.sort(() => 0.5 - Math.random()).slice(0, exam_total_questions));
};
