'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import styles from './control.module.css';
import { Loading } from '@/components/SERVICE_PAGES/Loading';
import {
    useGetFilterBooksQuery,
    useGetFiltersQuery,
} from '@/lib/redux/features/book/bookApi';

import Filter from '../Filter/Filter';
import Link from 'next/link';
import { IBook } from '@/app/book/[id]/page.types';
import Image from 'next/image';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import { Icon } from '@/components/common/Icon';
import { openModal, useDispatch } from '@/lib/redux';
import { useRouter } from 'next/navigation';

const Controls = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedSort, setSelectedSort] = useState<string>('За рейтингом');
    const [isOpenChoice, setIsOpenChoice] = useState(false);
    const sortArray: string[] = ["Дорожче", "Дешевше", "За рейтингом"];
    const searchParams = useSearchParams();
    const authors = decodeURIComponent(searchParams?.get('authors') || '');
    const minPrice = decodeURIComponent(searchParams?.get('minPrice') || '');
    const maxPrice = decodeURIComponent(searchParams?.get('maxPrice') || '');
    const publishers = decodeURIComponent(
        searchParams?.get('publishers') || ''
    );
    const languages = decodeURIComponent(searchParams?.get('languages') || '');
    const genre = decodeURIComponent(searchParams?.get('genre') || '');
    const page = decodeURIComponent(searchParams?.get('page') || '');
    const router = useRouter();

    const { data: filterBooks, isLoading } = useGetFilterBooksQuery({
        authors,
        minPrice,
        maxPrice,
        publishers,
        languages,
        genre,
        page
    });

    const { data: filtersData, isLoading: loaderFilter } =
        useGetFiltersQuery('');

    const dispatch = useDispatch();
 
    const handleOpenModal = (modalName: string, event: React.MouseEvent) => {
      event.preventDefault();
      // const addCardBook = useAddBookQuery({
      //   accessToken: token ?? "",
      //   bookId: book.id ?? "",
      //   type: BookType.Cart,
      // }, {skip: addClick===false});
      dispatch(openModal(modalName));
    };

    const handleSortClick = (sortText: string) => {
        setSelectedSort(sortText);
        setIsOpenChoice(false);
    };

    const loader = useRef<HTMLDivElement | null>(null);
            
    useEffect(() => {
        const handleResize = () => {
            // Your resize logic here
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const loadMoreItems = () => {
            // Your load more items logic here
        };

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMoreItems();
                }
            },
            {
                root: null,
                rootMargin: '20px',
                threshold: 1.0,
            }
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);

    
    const totalPages = filterBooks ? Math.ceil(filterBooks.quantity / 24) : 1;
    let newPage = !page ? 1 : page;

    const arrowPageNavigation = (action: string) => {
        if (action === "plus") {
            newPage = Number(newPage) + 1;
        } else if (action === "minus") {
            newPage = Number(newPage) - 1;
        }
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('page', newPage.toString());
        router.push(currentUrl.toString());
    };

    const pointsPageNavigation = (action: string) => {
        console.log(321321)
        if (action === "forward") {
            newPage = Number(newPage) + 2;
        } else if (action === "back") {
            newPage = Number(newPage) - 2;
        }
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('page', newPage.toString());
        router.push(currentUrl.toString());
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3;
        const currentPage = Number(newPage);

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pageNumbers.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 1) {
                pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pageNumbers;
    };

    const handlePageChange = (newPageTeest: number) => {
        newPage = newPageTeest;
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('page', newPage.toString());
        router.push(currentUrl.toString());
    };

    return (
        <>
            {isLoading && loaderFilter ? (
                <Loading />
            ) : (
                <section className={styles.section}>
                    <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div className={styles.computer__filter}>
                            <Filter filtersData={filtersData} />
                        </div>
                        <div className={styles.products__section}>
                            <div className={styles.information}>
                                <div className={styles.information__buttons}>
                                    <button className={styles.button__filter}><Icon size={24} name='icon-filter' />Фільтр <Icon size={12} name='icon-close' /></button>
                                    <div>
                                        <button className={`${styles.button__sort} ${isOpenChoice && styles.open}`} onClick={() => setIsOpenChoice(!isOpenChoice)}><Icon name='icon-choice' />{selectedSort}</button>
                                        {isOpenChoice && (
                                            <ul>
                                                {sortArray.map((text, index) => (
                                                    <li key={index}><button type='button' onClick={() => handleSortClick(text)}>{text}</button></li>
                                                ))}
                                            </ul>
                                            )}
                                    </div>
                                </div>
                                <ul className={styles.information__list}>
                                    {sortArray.map((text, index) => (
                                        <li key={index}>            
                                            <button onClick={() => handleSortClick(text)} className={text === selectedSort ? styles.open : undefined}>
                                                {text}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <p className={styles.information__quantity}>{filterBooks?.quantity} Товарів</p>
                            </div>
                            <ul className={styles.products__list}>
                                {filterBooks &&
                                filterBooks.books
                                .map((book: IBook) => (
                                    <li key={book.id} className={styles.products__item}>
                                        <Link href={`book/${book.id}`}>
                                        <Image width={230} height={288} className={styles.products__img} src={book.url} alt={book.title} />
                                        <div className={styles.products__wrapper}>
                                            <div className={styles.products__wrapper_information}>
                                                <p className={styles.products__title}>{book.title}</p>
                                                <p className={styles.products__author}>{book.author}</p>
                                            </div>
                                        <div className={styles.products__wrapper_functionality}>
                                            <span>{book.price}</span>
                                            <div className={styles.products__wrapper_button}>
                                            <FavoriteBtn book={book} isFavAlredy={false} />
                                            <button className={styles.button__basket} onClick={(e)=>{handleOpenModal('successInfo', e)}}>
                                                <Icon name="basket" size={24} color="#fff" />
                                            </button>
                                            </div>
                                        </div>
                                        </div>
                                    </Link>
                                  </li>
                                 ))}
                            </ul>
                            {totalPages > 1 && 
                            <div className={styles.pagination}>
                                <button className={styles.pagination__button_row} disabled={Number(page) < 2} onClick={() => arrowPageNavigation("minus")}><Icon name='icon-Alt-Arrow-Left' /></button>
                                {getPageNumbers().map((pageNumber, index) => (
                                    <button 
                                        key={index}
                                        className={`${styles.pagination__button_page} ${pageNumber === Number(newPage) ? styles.active : ''}`}
                                        onClick={() => typeof pageNumber === 'number' ? handlePageChange(pageNumber) : pointsPageNavigation(index > Number(newPage) ? "forward" : "back")}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                                <button className={styles.pagination__button_row} disabled={Number(page) > totalPages - 1} onClick={() => arrowPageNavigation("plus")}><Icon name='icon-Alt-Arrow-Right' /></button>
                            </div>}
                        </div>
                    </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Controls;
