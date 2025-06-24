/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} user
 * @property {string} pwd
 * @property {"admin" | "user"} level
 * @property {"on" | "off"} status
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} CreateUserRequest
 * @property {string} name
 * @property {string} email
 * @property {string} user
 * @property {string} pwd
 * @property {"admin" | "user"} level
 * @property {"on" | "off"} status
 */

/**
 * @typedef {Object} UpdateUserRequest
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [user]
 * @property {string} [pwd]
 * @property {"admin" | "user"} [level]
 * @property {"on" | "off"} [status]
 */

/**
 * @typedef {Object} Teacher
 * @property {string} id
 * @property {string} name
 * @property {string} school_disciplines
 * @property {string} contact
 * @property {string} phone_number
 * @property {"on" | "off"} status
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} CreateTeacherRequest
 * @property {string} name
 * @property {string} school_disciplines
 * @property {string} contact
 * @property {string} phone_number
 * @property {"on" | "off"} status
 */

/**
 * @typedef {Object} UpdateTeacherRequest
 * @property {string} [name]
 * @property {string} [school_disciplines]
 * @property {string} [contact]
 * @property {string} [phone_number]
 * @property {"on" | "off"} [status]
 */

/**
 * @typedef {Object} Student
 * @property {string} id
 * @property {string} name
 * @property {string} age
 * @property {string} parents
 * @property {string} phone_number
 * @property {string} special_needs
 * @property {"on" | "off"} status
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} CreateStudentRequest
 * @property {string} name
 * @property {string} age
 * @property {string} parents
 * @property {string} phone_number
 * @property {string} special_needs
 * @property {"on" | "off"} status
 */

/**
 * @typedef {Object} UpdateStudentRequest
 * @property {string} [name]
 * @property {string} [age]
 * @property {string} [parents]
 * @property {string} [phone_number]
 * @property {string} [special_needs]
 * @property {"on" | "off"} [status]
 */

/**
 * @typedef {Object} Professional
 * @property {string} id
 * @property {string} name
 * @property {string} specialty
 * @property {string} contact
 * @property {string} phone_number
 * @property {"on" | "off"} status
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} CreateProfessionalRequest
 * @property {string} name
 * @property {string} specialty
 * @property {string} contact
 * @property {string} phone_number
 * @property {"on" | "off"} status
 */

/**
 * @typedef {Object} UpdateProfessionalRequest
 * @property {string} [name]
 * @property {string} [specialty]
 * @property {string} [contact]
 * @property {string} [phone_number]
 * @property {"on" | "off"} [status]
 */

/**
 * @typedef {Object} Appointment
 * @property {string} id
 * @property {string} specialty
 * @property {string} comments
 * @property {string} date
 * @property {string} student
 * @property {string} professional
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} CreateAppointmentRequest
 * @property {string} specialty
 * @property {string} comments
 * @property {string} date
 * @property {string} student
 * @property {string} professional
 */

/**
 * @typedef {Object} UpdateAppointmentRequest
 * @property {string} [specialty]
 * @property {string} [comments]
 * @property {string} [date]
 * @property {string} [student]
 * @property {string} [professional]
 */

/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} description
 * @property {string} comments
 * @property {string} date
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} CreateEventRequest
 * @property {string} description
 * @property {string} comments
 * @property {string} date
 */

/**
 * @typedef {Object} UpdateEventRequest
 * @property {string} [description]
 * @property {string} [comments]
 * @property {string} [date]
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {*} [data]
 * @property {string} [message]
 * @property {string} [error]
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {boolean} success
 * @property {Array} data
 * @property {Object} pagination
 * @property {number} pagination.page
 * @property {number} pagination.limit
 * @property {number} pagination.total
 * @property {number} pagination.totalPages
 * @property {string} [message]
 */

export {} 