Application name i choose is "Roomentor"

# owner point of view
	owner can signup, signin using register and signin
	owner can create, edit, delete rooms and their details
	owner can upload and remove a room images which they uploaded


# customer point of view
	customer can signup and signin using register and signin
	customer can search a rooms based on city name
	customer can view list of rooms owned by different owner
	customer can check the room details, booking availablity, and owner details and price
	customer can choose a room and book by their own

# Schema structure:
	user table is splitted in to 2 tables
	1. owner and 2. customers

	owner tabel:{
		_id: object id,
		name: string,
		email: string,
		mobile: number,
		password: string (hased value)
		type: string (value: customer)
		address: text,
		city: string,
		state: string,
		pincode: number,
		securityQuestion: string,
		securityAnswer: string
		noOfRooms: number,
		roomsRef: array (list of rooms object id ),
		created_at: date
		created_by: object
	}

	customer tabel:{
		_id: object id,
		name: string,
		email: string,
		mobile: number,
		password: string (hased value)
		type: string (value: customer)
		address: text,
		city: string,
		state: string,
		pincode: number,
		securityQuestion: string,
		securityAnswer: string,	
		created_at: date,
		created_by: object
	}

	rooms table: {
		_id: object id,
		name: string,
		address: string,
		city: string,
		state: string,
		pincode: number,
		landMark: string,
		status: string, (value: available | booked)
		roomStatusId: string (value: object id of roomStatus table)
		// datesBooked: array (value: [{startDate,endDate, roomStatusId},{startDate,endDate, roomStatusId},....])
		startDate: date,
		endDate: date, (hint: these dates used to check room is avaliable and change the status of room if the date is not applicable)
		type: string(vlaue: single bed room, double bed, classic(2x)...)
		noOfBeds: {type: Number,required: true,},
		size: string (value: 120 sqft, ...)
		minimumBookingPeriod: number,
		MaximumBookingPeriod: number,
		rentPerDay: number,
		amenities: array (value: wifi, ac, cctv, tv, reception, daily house keeping, security, fire-extinguisher, first aid, laggage assistance)
		photos: array (value : imgae id, secure url, created at)
		ownerReference: string (value: object id of owner)
		createdAt: date,
		createdBy: object
	}

	roomStatus table: {
		_id: object id,
		ownerInfo: string (value: object id of owner),
		rommInfo: string (value: object id of room),
		customerInfo: string (value: object id of customer),
		daysOfBooked: number (value: no of days booked),
		startDate: date,
		endDate: date,
		roomStatus: string (value: booked | available)
		createdAt: date,
		createBy: object
	}
