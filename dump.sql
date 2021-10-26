--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cash; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cash (
    id integer NOT NULL,
    "userId" integer,
    box numeric,
    date date,
    description text
);


ALTER TABLE public.cash OWNER TO postgres;

--
-- Name: cash_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cash_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cash_id_seq OWNER TO postgres;

--
-- Name: cash_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cash_id_seq OWNED BY public.cash.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token text
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    password text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cash id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cash ALTER COLUMN id SET DEFAULT nextval('public.cash_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cash; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cash (id, "userId", box, date, description) FROM stdin;
1	2	3000	2021-10-24	salario
2	2	30	2021-10-24	estudos
3	2	30	2021-10-24	comida
4	2	52	2021-10-24	Japa
5	2	-70	2021-10-24	comida
6	2	-28.36	2021-10-24	Vinho
7	2	-5000	2021-10-24	Divida
8	2	5000	2021-10-24	Salario Basico
9	2	1000000	2021-10-24	heranca
10	2	1000000	2021-10-24	Nova Heranca muito doida to rico
11	2	-2000000	2021-10-24	Morri
12	2	-52.655	2021-10-24	Restaurate
13	2	-85.454	2021-10-24	Japa
14	2	-344	2021-10-24	comida
15	2	-85	2021-10-24	foodtruck
16	2	-2500	2021-10-25	Luta
17	2	-580	2021-10-25	vela
18	2	-211	2021-10-25	nada
19	2	-23	2021-10-25	fefe
20	2	900	2021-10-25	Salario
21	2	-35	2021-10-25	caro
22	2	32	2021-10-25	lol
23	2	-29.53	2021-10-25	lol
24	2	-52.5	2021-10-25	gogo
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, "userId", token) FROM stdin;
20	2	09c7bce9-1078-45fb-ba85-149e45753d7c
28	5	f1932e77-b1b8-42b1-9af6-d010476b2cfb
29	8	63c5d226-9074-4b4d-8f1b-1ba6254ed992
30	11	fcc4b9a7-362a-4cbe-9269-d29b053efb90
31	16	7967fa7d-9db6-4011-b351-8520d0e9f065
32	17	1bbeeb4a-85ea-41aa-96f6-90480d6e939f
33	18	2ad322e8-904f-427d-9b09-b9e7ded04968
34	19	8dea80fd-9c85-437f-ace6-1f966654ae5c
36	20	f2af5ea8-12d0-4595-b413-cbb39a4ffdc5
37	21	b60e49ef-ccd3-40ce-98a2-3cb5cb148b8c
38	22	6a7fa255-085b-427d-944c-c5f1be37507b
39	23	281965e6-afd6-49da-890f-2cd022cd8bc5
40	24	eb839903-68c8-4180-860b-bfb4197b7ba1
41	25	22aaed8b-deae-43e4-a904-e1b8c9a9404e
42	26	1413827d-b393-4f0a-b530-f802bd64d52d
43	30	bcea7812-e4ac-4282-9c3c-fcc2ddbc2828
44	31	a93a09cf-1480-403b-9eef-7240596f0928
45	32	17abd845-0405-4788-9794-45d2c9dd10d8
46	33	399a5944-2cc0-4234-91dc-9365d0571bde
47	34	581f913b-ef05-4761-b9e3-9b8089a81287
48	35	cb5ab2b7-ac05-4f2a-8c14-ffe4758f8ec5
49	36	cb61f458-b91f-4c77-b41b-c1af288855a3
50	37	d1567c15-6ee6-43cb-9f50-f0a326d0ee73
51	38	3e697d8c-6ae8-48a2-9f61-10e54b613748
52	39	157666d3-9ce7-43fc-81a1-9e25f33d27c3
53	40	aa87dd53-04b6-46c4-a9bb-e3e245c1d505
54	41	be1b0af4-933a-4779-b87b-257c5ef7ef9a
55	42	732afdb5-8006-4e88-9e46-add1713b18a2
56	43	329325c5-a863-4556-8066-4b1ddcdd53a2
57	44	c3aa8953-f7bc-44f9-98b0-895e0b6629a9
58	45	bf57ddcb-cd5f-4d1c-9232-70ca6f932e4e
59	46	5d54b0eb-d6d6-4c0b-a003-a5f6fcdeb9b3
60	47	39292d6d-ae72-4536-a99c-89e193617433
61	48	6ffd930c-640d-4bf7-b3cd-4711716ccd9c
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
1	\N	Diego@gmail	$2b$10$K9rNkc5Ue6Ux9CQ.S7qNVekN/AJvRMd4fgGovaF9dXqjBhd8mv/Um
2	Diego Nogueira	diegomamede@poli.ufrj.br	$2b$10$uGDBFWxxaCCBZkQtH2LpSeGBZ4gqwwDyyNw/Cc0fpbXragpnM0TaO
3	Diego Nogueira	diegomamede@poli.ufrj	$2b$10$tict3TcC1ft1vMsnD6i3L.CPwKHK1aizQ4FdlmpZMlQOFZl0YUURW
4	D	diegomamede@poli.ufrj.b	$2b$10$tG0esJYtx0IZouv74TN00e7ycF027gQ92GdgAg7hHoz1nEdEuBUXW
\.


--
-- Name: cash_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cash_id_seq', 24, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 62, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 48, true);


--
-- PostgreSQL database dump complete
--

