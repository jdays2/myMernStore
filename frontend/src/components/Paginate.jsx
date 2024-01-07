import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const Paginate = ({ page, pages, isAdmin = false }) => {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((x) => {
					return (
						<LinkContainer
							key={x + 1}
							to={isAdmin ? `/admin/product-list/page/${x + 1}` : `/pages/${x + 1}`}>
							<Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
						</LinkContainer>
					);
				})}
			</Pagination>
		)
	);
};
