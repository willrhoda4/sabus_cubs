PGDMP     8    :            	    |        
   sabus_cubs    13.11    15.2 m    ]           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ^           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            _           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            `           1262    25273 
   sabus_cubs    DATABASE     v   CREATE DATABASE sabus_cubs WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE sabus_cubs;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            a           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    4            b           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            �            1259    49984    admin    TABLE     �   CREATE TABLE public.admin (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    reset_token character varying(255),
    reset_at bigint
);
    DROP TABLE public.admin;
       public         heap    postgres    false    4            �            1259    49982    admin_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.admin_id_seq;
       public          postgres    false    226    4            c           0    0    admin_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;
          public          postgres    false    225            �            1259    33467    board    TABLE     �   CREATE TABLE public.board (
    id integer NOT NULL,
    full_name character varying(255),
    title character varying(255),
    bio character varying(1020),
    public_id character varying(255),
    rank integer
);
    DROP TABLE public.board;
       public         heap    postgres    false    4            �            1259    33465    board_id_seq    SEQUENCE     �   CREATE SEQUENCE public.board_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.board_id_seq;
       public          postgres    false    4    205            d           0    0    board_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.board_id_seq OWNED BY public.board.id;
          public          postgres    false    204            �            1259    41773 	   donations    TABLE     !  CREATE TABLE public.donations (
    id integer NOT NULL,
    customer_id character varying(255) NOT NULL,
    subscription_id character varying(255),
    amount integer NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    donation_id character varying
);
    DROP TABLE public.donations;
       public         heap    postgres    false    4            �            1259    41771    donations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.donations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.donations_id_seq;
       public          postgres    false    216    4            e           0    0    donations_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.donations_id_seq OWNED BY public.donations.id;
          public          postgres    false    215            �            1259    41745    donees    TABLE       CREATE TABLE public.donees (
    id integer NOT NULL,
    customer_id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    created_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.donees;
       public         heap    postgres    false    4            �            1259    41743    donees_id_seq    SEQUENCE     �   CREATE SEQUENCE public.donees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.donees_id_seq;
       public          postgres    false    212    4            f           0    0    donees_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.donees_id_seq OWNED BY public.donees.id;
          public          postgres    false    211            �            1259    49957    emails    TABLE     c   CREATE TABLE public.emails (
    id integer NOT NULL,
    email character varying(255) NOT NULL
);
    DROP TABLE public.emails;
       public         heap    postgres    false    4            �            1259    49955    emails_id_seq    SEQUENCE     �   CREATE SEQUENCE public.emails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.emails_id_seq;
       public          postgres    false    4    224            g           0    0    emails_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.emails_id_seq OWNED BY public.emails.id;
          public          postgres    false    223            �            1259    25298    faq    TABLE     �   CREATE TABLE public.faq (
    id integer NOT NULL,
    question character varying(255),
    answer character varying,
    rank integer
);
    DROP TABLE public.faq;
       public         heap    postgres    false    4            �            1259    25296 
   faq_id_seq    SEQUENCE     �   CREATE SEQUENCE public.faq_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.faq_id_seq;
       public          postgres    false    203    4            h           0    0 
   faq_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.faq_id_seq OWNED BY public.faq.id;
          public          postgres    false    202            �            1259    41665    ig_token    TABLE     �   CREATE TABLE public.ig_token (
    token character varying(510) NOT NULL,
    refresh_date timestamp without time zone NOT NULL,
    id character varying(255)
);
    DROP TABLE public.ig_token;
       public         heap    postgres    false    4            �            1259    41659    items    TABLE     j   CREATE TABLE public.items (
    id integer NOT NULL,
    item character varying(255),
    rank integer
);
    DROP TABLE public.items;
       public         heap    postgres    false    4            �            1259    41657    items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.items_id_seq;
       public          postgres    false    4    207            i           0    0    items_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;
          public          postgres    false    206            �            1259    49929    journalists    TABLE     �   CREATE TABLE public.journalists (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    outlet character varying(255),
    rank integer
);
    DROP TABLE public.journalists;
       public         heap    postgres    false    4            �            1259    49927    journalists_id_seq    SEQUENCE     �   CREATE SEQUENCE public.journalists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.journalists_id_seq;
       public          postgres    false    220    4            j           0    0    journalists_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.journalists_id_seq OWNED BY public.journalists.id;
          public          postgres    false    219            �            1259    25276    misc    TABLE     w   CREATE TABLE public.misc (
    key character varying NOT NULL,
    value character varying,
    id integer NOT NULL
);
    DROP TABLE public.misc;
       public         heap    postgres    false    4            �            1259    25274    misc_id_seq    SEQUENCE     �   ALTER TABLE public.misc ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.misc_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    201            �            1259    49946    news_releases    TABLE     �   CREATE TABLE public.news_releases (
    id integer NOT NULL,
    date date,
    html character varying,
    content character varying,
    headline character varying(255),
    pdf_url character varying,
    rank integer,
    published boolean
);
 !   DROP TABLE public.news_releases;
       public         heap    postgres    false    4            �            1259    49944    news_releases_id_seq    SEQUENCE     �   CREATE SEQUENCE public.news_releases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.news_releases_id_seq;
       public          postgres    false    4    222            k           0    0    news_releases_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.news_releases_id_seq OWNED BY public.news_releases.id;
          public          postgres    false    221            �            1259    50002    site_settings    TABLE     �   CREATE TABLE public.site_settings (
    id integer NOT NULL,
    setting_name character varying(255) NOT NULL,
    setting_value boolean NOT NULL
);
 !   DROP TABLE public.site_settings;
       public         heap    postgres    false    4            �            1259    50000    site_settings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.site_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.site_settings_id_seq;
       public          postgres    false    228    4            l           0    0    site_settings_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.site_settings_id_seq OWNED BY public.site_settings.id;
          public          postgres    false    227            �            1259    41673    stories    TABLE     	  CREATE TABLE public.stories (
    id integer NOT NULL,
    headline character varying(255),
    outlet character varying(255),
    date date,
    image_url character varying(255),
    image_alt character varying(255),
    url character varying,
    rank integer
);
    DROP TABLE public.stories;
       public         heap    postgres    false    4            �            1259    41671    stories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.stories_id_seq;
       public          postgres    false    4    210            m           0    0    stories_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.stories_id_seq OWNED BY public.stories.id;
          public          postgres    false    209            �            1259    41759    subscriptions    TABLE     n  CREATE TABLE public.subscriptions (
    id integer NOT NULL,
    customer_id character varying(255) NOT NULL,
    subscription_id character varying(255) NOT NULL,
    amount integer NOT NULL,
    created_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    cancelled_on timestamp without time zone,
    cancelled_because character varying(2440)
);
 !   DROP TABLE public.subscriptions;
       public         heap    postgres    false    4            �            1259    41757    subscriptions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.subscriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.subscriptions_id_seq;
       public          postgres    false    214    4            n           0    0    subscriptions_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.subscriptions_id_seq OWNED BY public.subscriptions.id;
          public          postgres    false    213            �            1259    41786    updates    TABLE     �   CREATE TABLE public.updates (
    id integer NOT NULL,
    donee_id integer,
    token character varying NOT NULL,
    token_expiry bigint NOT NULL
);
    DROP TABLE public.updates;
       public         heap    postgres    false    4            �            1259    41784    updates_id_seq    SEQUENCE     �   CREATE SEQUENCE public.updates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.updates_id_seq;
       public          postgres    false    4    218            o           0    0    updates_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.updates_id_seq OWNED BY public.updates.id;
          public          postgres    false    217            �           2604    49987    admin id    DEFAULT     d   ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);
 7   ALTER TABLE public.admin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    226    226            �           2604    33470    board id    DEFAULT     d   ALTER TABLE ONLY public.board ALTER COLUMN id SET DEFAULT nextval('public.board_id_seq'::regclass);
 7   ALTER TABLE public.board ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            �           2604    41776    donations id    DEFAULT     l   ALTER TABLE ONLY public.donations ALTER COLUMN id SET DEFAULT nextval('public.donations_id_seq'::regclass);
 ;   ALTER TABLE public.donations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    41748 	   donees id    DEFAULT     f   ALTER TABLE ONLY public.donees ALTER COLUMN id SET DEFAULT nextval('public.donees_id_seq'::regclass);
 8   ALTER TABLE public.donees ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            �           2604    49960 	   emails id    DEFAULT     f   ALTER TABLE ONLY public.emails ALTER COLUMN id SET DEFAULT nextval('public.emails_id_seq'::regclass);
 8   ALTER TABLE public.emails ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    25301    faq id    DEFAULT     `   ALTER TABLE ONLY public.faq ALTER COLUMN id SET DEFAULT nextval('public.faq_id_seq'::regclass);
 5   ALTER TABLE public.faq ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            �           2604    41662    items id    DEFAULT     d   ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);
 7   ALTER TABLE public.items ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �           2604    49932    journalists id    DEFAULT     p   ALTER TABLE ONLY public.journalists ALTER COLUMN id SET DEFAULT nextval('public.journalists_id_seq'::regclass);
 =   ALTER TABLE public.journalists ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    49949    news_releases id    DEFAULT     t   ALTER TABLE ONLY public.news_releases ALTER COLUMN id SET DEFAULT nextval('public.news_releases_id_seq'::regclass);
 ?   ALTER TABLE public.news_releases ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    50005    site_settings id    DEFAULT     t   ALTER TABLE ONLY public.site_settings ALTER COLUMN id SET DEFAULT nextval('public.site_settings_id_seq'::regclass);
 ?   ALTER TABLE public.site_settings ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    228    228            �           2604    41676 
   stories id    DEFAULT     h   ALTER TABLE ONLY public.stories ALTER COLUMN id SET DEFAULT nextval('public.stories_id_seq'::regclass);
 9   ALTER TABLE public.stories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            �           2604    41762    subscriptions id    DEFAULT     t   ALTER TABLE ONLY public.subscriptions ALTER COLUMN id SET DEFAULT nextval('public.subscriptions_id_seq'::regclass);
 ?   ALTER TABLE public.subscriptions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �           2604    41789 
   updates id    DEFAULT     h   ALTER TABLE ONLY public.updates ALTER COLUMN id SET DEFAULT nextval('public.updates_id_seq'::regclass);
 9   ALTER TABLE public.updates ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            X          0    49984    admin 
   TABLE DATA           K   COPY public.admin (id, email, password, reset_token, reset_at) FROM stdin;
    public          postgres    false    226   )v       C          0    33467    board 
   TABLE DATA           K   COPY public.board (id, full_name, title, bio, public_id, rank) FROM stdin;
    public          postgres    false    205   �v       N          0    41773 	   donations 
   TABLE DATA           `   COPY public.donations (id, customer_id, subscription_id, amount, date, donation_id) FROM stdin;
    public          postgres    false    216   �w       J          0    41745    donees 
   TABLE DATA           J   COPY public.donees (id, customer_id, name, email, created_on) FROM stdin;
    public          postgres    false    212   �z       V          0    49957    emails 
   TABLE DATA           +   COPY public.emails (id, email) FROM stdin;
    public          postgres    false    224   �{       A          0    25298    faq 
   TABLE DATA           9   COPY public.faq (id, question, answer, rank) FROM stdin;
    public          postgres    false    203   K|       F          0    41665    ig_token 
   TABLE DATA           ;   COPY public.ig_token (token, refresh_date, id) FROM stdin;
    public          postgres    false    208   À       E          0    41659    items 
   TABLE DATA           /   COPY public.items (id, item, rank) FROM stdin;
    public          postgres    false    207   ��       R          0    49929    journalists 
   TABLE DATA           D   COPY public.journalists (id, name, email, outlet, rank) FROM stdin;
    public          postgres    false    220   �       ?          0    25276    misc 
   TABLE DATA           .   COPY public.misc (key, value, id) FROM stdin;
    public          postgres    false    201   k�       T          0    49946    news_releases 
   TABLE DATA           d   COPY public.news_releases (id, date, html, content, headline, pdf_url, rank, published) FROM stdin;
    public          postgres    false    222   ��       Z          0    50002    site_settings 
   TABLE DATA           H   COPY public.site_settings (id, setting_name, setting_value) FROM stdin;
    public          postgres    false    228   �       H          0    41673    stories 
   TABLE DATA           ^   COPY public.stories (id, headline, outlet, date, image_url, image_alt, url, rank) FROM stdin;
    public          postgres    false    210   �       L          0    41759    subscriptions 
   TABLE DATA           ~   COPY public.subscriptions (id, customer_id, subscription_id, amount, created_on, cancelled_on, cancelled_because) FROM stdin;
    public          postgres    false    214   D�       P          0    41786    updates 
   TABLE DATA           D   COPY public.updates (id, donee_id, token, token_expiry) FROM stdin;
    public          postgres    false    218   &�       p           0    0    admin_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.admin_id_seq', 2, true);
          public          postgres    false    225            q           0    0    board_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.board_id_seq', 6, true);
          public          postgres    false    204            r           0    0    donations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.donations_id_seq', 23, true);
          public          postgres    false    215            s           0    0    donees_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.donees_id_seq', 13, true);
          public          postgres    false    211            t           0    0    emails_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.emails_id_seq', 10, true);
          public          postgres    false    223            u           0    0 
   faq_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.faq_id_seq', 8851, true);
          public          postgres    false    202            v           0    0    items_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.items_id_seq', 19, true);
          public          postgres    false    206            w           0    0    journalists_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.journalists_id_seq', 2, true);
          public          postgres    false    219            x           0    0    misc_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.misc_id_seq', 5, true);
          public          postgres    false    200            y           0    0    news_releases_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.news_releases_id_seq', 46, true);
          public          postgres    false    221            z           0    0    site_settings_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.site_settings_id_seq', 1, true);
          public          postgres    false    227            {           0    0    stories_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.stories_id_seq', 3, true);
          public          postgres    false    209            |           0    0    subscriptions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.subscriptions_id_seq', 7, true);
          public          postgres    false    213            }           0    0    updates_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.updates_id_seq', 7, true);
          public          postgres    false    217            �           2606    49992    admin admin_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public            postgres    false    226            �           2606    33475    board board_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.board DROP CONSTRAINT board_pkey;
       public            postgres    false    205            �           2606    41782    donations donations_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.donations
    ADD CONSTRAINT donations_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.donations DROP CONSTRAINT donations_pkey;
       public            postgres    false    216            �           2606    41756    donees donees_customer_id_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.donees
    ADD CONSTRAINT donees_customer_id_key UNIQUE (customer_id);
 G   ALTER TABLE ONLY public.donees DROP CONSTRAINT donees_customer_id_key;
       public            postgres    false    212            �           2606    41754    donees donees_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.donees
    ADD CONSTRAINT donees_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.donees DROP CONSTRAINT donees_pkey;
       public            postgres    false    212            �           2606    49962    emails emails_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.emails
    ADD CONSTRAINT emails_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.emails DROP CONSTRAINT emails_pkey;
       public            postgres    false    224            �           2606    25306    faq faq_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.faq
    ADD CONSTRAINT faq_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.faq DROP CONSTRAINT faq_pkey;
       public            postgres    false    203            �           2606    41664    items items_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public            postgres    false    207            �           2606    49937    journalists journalists_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.journalists
    ADD CONSTRAINT journalists_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.journalists DROP CONSTRAINT journalists_pkey;
       public            postgres    false    220            �           2606    25283    misc misc_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.misc
    ADD CONSTRAINT misc_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.misc DROP CONSTRAINT misc_pkey;
       public            postgres    false    201            �           2606    49954     news_releases news_releases_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.news_releases
    ADD CONSTRAINT news_releases_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.news_releases DROP CONSTRAINT news_releases_pkey;
       public            postgres    false    222            �           2606    50007     site_settings site_settings_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.site_settings DROP CONSTRAINT site_settings_pkey;
       public            postgres    false    228            �           2606    50009 ,   site_settings site_settings_setting_name_key 
   CONSTRAINT     o   ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_setting_name_key UNIQUE (setting_name);
 V   ALTER TABLE ONLY public.site_settings DROP CONSTRAINT site_settings_setting_name_key;
       public            postgres    false    228            �           2606    41768     subscriptions subscriptions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_pkey;
       public            postgres    false    214            �           2606    41770 /   subscriptions subscriptions_subscription_id_key 
   CONSTRAINT     u   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_subscription_id_key UNIQUE (subscription_id);
 Y   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT subscriptions_subscription_id_key;
       public            postgres    false    214            �           2606    41803    updates unique_donee_id 
   CONSTRAINT     V   ALTER TABLE ONLY public.updates
    ADD CONSTRAINT unique_donee_id UNIQUE (donee_id);
 A   ALTER TABLE ONLY public.updates DROP CONSTRAINT unique_donee_id;
       public            postgres    false    218            �           2606    41794    updates updates_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.updates
    ADD CONSTRAINT updates_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.updates DROP CONSTRAINT updates_pkey;
       public            postgres    false    218            �           2606    41795    updates updates_donee_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.updates
    ADD CONSTRAINT updates_donee_id_fkey FOREIGN KEY (donee_id) REFERENCES public.donees(id);
 G   ALTER TABLE ONLY public.updates DROP CONSTRAINT updates_donee_id_fkey;
       public          postgres    false    3236    218    212            X   �   x�M̽n�0@��~�̮o����H���ځ�^�F�p�T<=�����Q���LU-Lu���xš�8^�ֺ��$�gҊe(�v�����|O�}����:��u�f���eU�Y_6�}:��G�S޸]��9q�����\͖�`��\~^)Y4�����_!�´�{�lہ��AI)��@�      C   �   x�M�1O�0�g�WxcAi�$n3"��,&>5&Ǝ|�T���q),��{����c��XJ�=E�骄E�Š�o#d�@L/ t/�7B;�ֹ)Ul��Z6ݾ��n��?ȦW�v7�68څjx��%�<{�赳H�V!����%ZH!Z�J<d��S��&��3\�[����'D�b��xґ��r3g�� Jq
��a�m����t*& �;ڢ��&1��x�g���WJ�}��] �u����� �v}�      N   �  x�u��n�0���)�j�x�s��t�%�4�J#�)K�O?�$ԣR)������J����r�,g�y��ƻzk]QBH����5�_ l�lN0�J��JƿY:�[7v��"n�%u�Ӑ��H}���>�w1��G.��&V8;�ݦaΓ����"�6g�w���]q8��	�f�*�k��~����l;A���J��ٮ]�f���2�PJ���6��`�Uhw:�B�m`E#i! ���mk�a�Y{�R�?���mA0%����zd�y@��*@ 5�����;���ۖN(�M	�TJvFsi��f�0��x�	m��~N��8�~��M�4�*�O����͏C��U�#کŃ��ܣ��j/p�ey����3J�{��0�V�,q�`���������Ή1ն���|�V��"�=v���G��ba �yەQ+��R ��z����b�\�U�*�&�"�O�0ƺq�!|�#P5Z�����.���D)*t0�t�5��E�U�.�u�|��|�i���k\��ϡ�3��0�ԩr���ʊaR���ИRiѺ�A�3���2�!Z�ʥ#���|3iˋ3�D`*����4�[����)T��M�w�����D�5�k�g�*K�%,7�W� +�QZ��u#�a����s�p,�>_�(��7*͒C��ƈ�B>m�1mB����ݷJ�D�MKTa"	�C�s�6*�'��c�B� ���G      J     x����j�@���S��Ό�q$fѴE�4
e��j��H~��ɢ�M7�s���(��+Ye���U[�E;�3mkt�ee�-���M���8%��:mZ�������E��
�g�
Ex�]RDz��Fލd��t�ؘr��9>�B!��9��"��K��F����&��)]@Ą�)@��x��V&y��U?TN̜���5)ƶ,������Y0REQ����P��o��ϙX��cY>d���̚S�d�$�|$%S*�����R�sz�      V   @   x�3�,���)��OI4qH�M���K���2A�"	�"�͐����H�ɉ�E�yHb1z\\\ S7'<      A   h  x��V�n7>��b|��뺵=n4�����m���.#.��T��w詯�'�7���Ҽ@��$.�g�~3����ŏ�r��V�J�L�ae��pJ�NEb�G+��g�<Ŏɲn��%�9�L�X��I[��z�XLl[�זj��	���*i�hے�a{���H�\���M���2�t~:7r����Fl����ly��1�r^e���W�,�pل�Z*ϖC���֫�+�1(-��CȞ�o���EG�Y 2r�
)D������l� .����dr�M�=R qI�7�X�U6,q��:� U������[��E�H	�UU��TZ*3�w8�4�5��߻�f�̠������R�o�Ɗ�� �Fl$�i@H9D�@�0:�-�\�/�2�aL���j�{n������M^��v���rQ�P��0(;��h�����i�s�Ȩzn�6HZsU���-R��{�5ʹ-3����ѐ*��#j��::��l��G�۝A����a(S����)�G��k�c�+�#/���ͪ�OG�����Wg�:�v����\w��z_^��0��i!��>����Yٜ=���D��&��u���a�U��%���$z���E6�R�.|��#�p�5��pU�?�o�t��m���)���Ov�A��5<��@�!�-�], UB�U��ZYzE-�A�pf���|=!sZ��1����AWW���ɔ(��I0J62��p���6���t�-��>m��c��Q�c�Af�t�u{+�����n���__?
 :nf�/�����{}�y̞��K��J_��j@:��5����[��x���eС�TDN>��6hۀ�I������}n�"A8�������C*0h|)h��`�I�-l��y,����Яm͇Rb�b%���E�jPx�;�$�1)_jZ��@�
�n�9��1R�=�܄��X�+�I$��z�0�I��r6&߀��@Y|',>+n�p=�(��B�^���E�	��v���"��#k��lp5�G]��<��cH٨P�Zp^\��42�����5����&��ë�h�=}�@]�Z@�N�gɈ~�uJ��3�k���W��^Y\<����@      F   �   x���
�0 @��|�^ ���N�M���m�!-��ia?��	��|)͊��D1kW�*���<�@O���f=�Nj�(hB�FΡY�D�3���୊�ˈj�gy9���3�׉S�`�}�;�"��	�N�1��u	~oI�#w�P��G����h� ��-���[c����2��a�m˲�8d:�      E   W   x�34�t�/M�IUp��O��I,IU�����4�2��t�HM-N�4�2��H�KN�N-�4�24�t*JML�4�24��)�4����� ��J      R   l   x�3�����L�UJM��K�IQ��OI�,
�X&鹉�9z����f%�9�ŜF\��ɉ�%9�y
���E�9��0=��^yjRqfI*�vg'g���bNC�=... �**q      ?   e   x�%�A
�0 ��+r󶰫>b�� Yh�6�D��k�2��eΐ�twx��;k��B�o�s_)�%�b�p���V�Ú�T�����O�Y
<��B�P&$�      T   �	  x��[�n�8��>׃��|���iL7���)��EZ�DK�H����z�;�}�y�=��mّ�iQ7=��XE~�F~��{�n���Z��ޛ�M�����.~<���b�M���f1O�G�6��T�][",g~ĵ�Q�WOZǍ�>V�X�������<xh�y>4쥕q��.�+���1�������N�5�g��)���v��Tj[#��xz�k��&3<5-#�=�(�A PNX�������Mmt��-ˇ�Xf"��^��횙�C����Z�`���� �M�n9n*&��E,�Yk�s���	����_c^�Q����Z�*[����A�B���l���	�2����>kg�O$�.G�	P&�:�	���a1��L�Ƨj�/R+��Yox���)��y���N��[�Ɉ���W��',�bz�����H�� ���omyGҊ�ɸgZ�М�a�d,t��n��r��*��%�G�P�3TV 
�nT,�����q�p�4�2ID�Re��*�u�W�?����	��vSJ�J��v�!��B�r�L��>���ʻ��C"ə�k�:/���K���.<������K;��С�������N$\�`�w�ǫq�J�Z�3-�W�'��,!��$<��p�{~��6֞vVy�ig���"c���s�cṇF�M������i-��A�ԡq��؋�
�*�yw���)�F� ��̜t:Z���V����c�R��l�#�N�Ŋ�q���x���c��H?�K�����4�Z	M���@�g�U��վQ�����8���ƙ%j��LS�����d�{��6�-3�.Ƌ��y��~�����&{뾮�n2��*I��"`�J[�V#i��!O�/E�Px>�V��y*�8t��OSX�|a`�2K�X&���1�PC�T{��jTc��+,�zI 6
���J�����JK�=WXj*�,�ux�r)�٫H �#�I���������2�ɤ�p>��(ؐE:�Z�h���p�Hfm\u���*U��U>��}4vEm�/��]�;V>��w(����D�����
@kႱ�s�������O@��6�ǖ=��'tI�p_p�Di��3�. �5x�c�Y"�Aԡ���T�CB/�f��s��1�vh
>�x�"78���OT��&I�&��
au�I�<�b܈�2��2<˔K ��c�t��pj���L]	���*-��'�mӥ�7aH ��H\șJ����/���/-��3�6�F(�p�e�O!����� m�|�^7�P`֍�!A1�o`��5q�p&����ť5c�n�|?�Q>^ɰ�����&�X@�m�i�ֱ(����i-F�(��_���e=r&0y�T&�"�d��`�H��&*V��j9̡��
,�C���m�j�ei ,��<�E(]�B��盐͐&������nJ̘����_S��"(�$�4�T(�MM[�rp�� �#�p�xǓ,KkV+����M�P���xC6�W7��-��-�J�>����_�W�G"�����^������cDk��T�`�U��Ӎ�"�ެ�ff�ʍ�
h����S<�j�ft��K����&�j`��X6peX��o� 2K��xz���X�2�#�X�,��c����,����F��VV ʵ�Pl�cH\��A��|�_+�c�|��EP?z3�Lڎ� �q�qv�����ڐ�P�n'�-
�2	�iX
 �\E�3 �����v#M���!�[8n�l�]7k��K�9=����0��.�Y崳BI��,N#��m�>������]c"��Y���0�F����<��ul�:���h,����3�F˘e]{��k��{�O��[�Qw���Aop��C�<0KWN�m��x8��&�ʉ=�؛�r��u�Y0�{�lotop�����r�,^���2�H�"q�ĭl$n��E��[K��D��[_��UˉI޺J$o����4��E��[$o���[l����@H�"yk�����~�"zq�����N����b=�x.n��u�"nvW�*�^��]v��� � {��0H|�L��k؆���<L�H�%{U�+��2깆$��s�b��H#y��l$��<F��cK��D��c_�<��X5	lw�H�6ؾ��.�H`#��6�v������	l$�����I^go!���L�=�s��W��xoޫ����= ��=�͑��߱�{��B�����F3.��#<����|^z/��6���+���:w��S�^�Fi|���W��4>��H�#�oɢ�H�#�����>6�&q�.���G���w�F��{$G��n��>?!q�Ľ]�>�{��z�ã���U=���^�ړ�7G�-����P{%jo��s��9�n�;��y�w�{.XQ�u)o����V���7R�Hy#�mɢ�Hy#�m���
�%��.K�HF"��w\E"�d$��HF"�n��>?!��D�]�毝����Q��&M�IY8�7�x�=^Po�����?��Ƣ      Z   "   x�3��M��+I�K�KN���OI�L����� x�      H     x����n�0�י�0v8���a�PؠJT���F7�Mb��Q�4̎����$8u�6H�e��=�|:<�jgӑ���xK��5�S��vf���t��G����x��Ν��3..�HiRєG���{˘�e-c	���>U�żاYVU��b���i����|R��c��58�G���ŏ���栞��r���0��x��)[�`.�˲<ˇ �I0�  ��5���}O�a�(:��hs�E/��
���U��4��\���J�ȵ��!70���Մ�a]��(���:���[o+�ܧ�h�|�M�<�ڔC�:�[�"���� �ZʳM��b�N��� La���t4�"/9ϓ���Q>��^p���q:�:ġ��֛B��a߉�#N���#_�� �U��Nֶ$4h"��^iMއÕl seN�W��/y�e��X5Im�$��_<D��y���١O�jM�<��Y.D�݆"���>[����]O�,�4v��m�>:�AD$IB݈A+&<�pO�����"���v�ߊZ�      L   �   x�e��j�@����Ux.3;;;�=klJkl6�
-b��	Z��dN>x^�U�k�8)�qA����jv���*��e<ݴevt�z�>�Q� t��!�h���A�pg,�NX�3"��<��o�N�Ǚ�+�z����ko���A�B����H�g��]9�/��ڤ�����pv���_�.�u9n�����t�hÈ�o'�`���{sE�֡Ok      P   u   x�%��C! �3�BF��K.��KH2��
$�5?�I���	��0	��OPL�0Dp�d�u��&*��}K�l�1KM�b��@Mռڰ�&�ka�,�b�J+�_2r�oz���S$�     