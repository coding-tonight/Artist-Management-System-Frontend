export const userTableHeader = [
    {
      title: 'S.N',
      dataIndex: 'index',
      sorter: true,
      width: '10%',
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: 'Name',
      dataIndex: 'title',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Dob',
      dataIndex: 'dob',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '20%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];


  export const artistTableHeader = [
    {
      title: 'S.N',
      dataIndex: 'index',
      sorter: (a, b) => a.index - b.index,
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'title',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '20%',
    },
    {
      title: 'Dob',
      dataIndex: 'dob',
      width: '20%',
    },
    {
      title: 'First Release Year',
      dataIndex: 'first_release_year',
      width: '20%',
    },
    {
      title: 'No of Albums released',
      dataIndex: 'no_of_albums_released',
      width: '20%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ]

export const musicTableHeader = [
  {
    title: 'S.N',
    dataIndex: 'index',
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Album Name',
    dataIndex: 'album_name',
    width: '20%',
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
  },
  {
    title: 'Artist',
    dataIndex: 'artist_name',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
]

export const artistMusicTableHeader = [
  {
    title: 'S.N',
    dataIndex: 'index',
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Album Name',
    dataIndex: 'album_name',
    width: '20%',
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
]