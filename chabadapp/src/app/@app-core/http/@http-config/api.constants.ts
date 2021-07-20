import { Role } from '../account/account.DTO';

export const DROPDOWNNOTFOUND = 'Không tìm thấy kết quả';

export const PageNavigation = {
  page: 1,
  amount: 10,
  typesort: '1',
  search: '',
  totalAmount: 0,
  totalPage: 0
};

export const COUNTPERPAGE = [
  { number: 10, name: 10 },
  { number: 20, name: 20 },
  { number: 30, name: 30 },
  { number: 40, name: 40 },
  { number: 50, name: 50 }
];

export const TIMEOUTSEARCH = 500;

export const PERMISSIONS = [
  {
    valueView: 'Guest',
    value: 'guest'
  },
  {
    valueView: 'Standard',
    value: 'standard'
  },
  {
    valueView: 'Premium',
    value: 'premium'
  }
];

export const PRODUCT_TYPE = [
  {
    valueView: 'Đồ ăn',
    value: 'food'
  },
  {
    valueView: 'Thức uống',
    value: 'drink'
  }
];

export const STATUS_ORDER = [
  {
    valueView: 'Đang xác nhận',
    value: 'pending'
  },
  {
    valueView: 'Đã xác nhận',
    value: 'confirmed'
  },
  {
    valueView: 'Đang giao hàng',
    value: 'delivering'
  },
  {
    valueView: 'Giao hàng thành công',
    value: 'delivery_sucessed'
  },
  {
    valueView: 'Giao hàng thất bại',
    value: 'delivery_failed'
  }
]

export const STATUS_BOOKING = [
  {
    valueView: 'Đang xác nhận',
    value: 'pending'
  },
  {
    valueView: 'Đã xác nhận',
    value: 'confirmed'
  },
  {
    valueView: 'Hủy đặt chỗ',
    value: 'reject'
  },
]

export const AREA_TYPE = [
  {
    valueView: 'coffee',
    value: 'coffee'
  },
  {
    valueView: 'game',
    value: 'game'
  },
  {
    valueView: 'buffet',
    value: 'buffet'
  },
]

export const STATUS_SERVICE = [
  {
    valueView: 'Sẵn sàng',
    value: 'ready'
  },
  {
    valueView: 'Tạm khóa',
    value: 'locked'
  }
]
