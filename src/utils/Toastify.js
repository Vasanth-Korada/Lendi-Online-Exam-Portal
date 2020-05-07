import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Toast(value = 'notified', type = 'default', progress = false, pos = 'top-center', time = 5000, d) {
	if (type === 'default') {
		toast(value, {
			hideProgressBar: progress,
			position: pos,
			autoClose: time,
			delay: d
		});
	} else if (type === 'warn') {
		toast.warn(value, {
			hideProgressBar: progress,
			position: pos,
			autoClose: time,
			delay: d
		});
	} else if (type === 'info') {
		toast.info(value, {
			hideProgressBar: progress,
			position: pos,
			delay: d,
			autoClose: time
		});
	} else if (type === 'success') {
		toast.success(value, {
			hideProgressBar: progress,
			position: pos,
			autoClose: time,
			delay: d
		});
	} else if (type === 'error') {
		toast.error(value, {
			hideProgressBar: progress,
			position: pos,
			autoClose: time,
			delay: d
		});
	}
}
export default Toast;
