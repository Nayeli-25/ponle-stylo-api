import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	/*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
<<<<<<< HEAD:app/Validators/ProductValidator.ts
  public schema = schema.create({
	imagenes: schema.array().members(
		schema.file({
			size: '5mb',
		extnames: ['jpg', 'png']
		})
	  )
  })
=======
	public schema = schema.create({
		imagenes: schema.array().members(
			schema.file({
				size: '5mb',
			extnames: ['jpg', 'png']
			})
		  )
	  })
>>>>>>> ea6fcd2ad2d07f7a0b986bb5da7b558561b67ba4:app/Validators/ProductPhotoValidator.ts

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
  public messages = {}
}
