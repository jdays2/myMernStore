import { useEffect } from 'react';

const useTitle = (title, dependencies = []) => {
	useEffect(() => {
		if (title) {
			document.title = `MERN | ${title}`;
		}
	}, [title, ...dependencies]);
};

export default useTitle;
