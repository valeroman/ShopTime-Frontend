import React from 'react';
import { countries } from '../helpers/fixedCountries';

const UserProfileForm = ({
    address_line_1,
    address_line_2,
    city,
    state_province_region,
    zipcode,
    telephone_number,
    country_region,
    onChange,
    onSubmit,
    profile,
}) => {
    return (
        <div className='card mb-5'>
            <h3 className='card-header'>
                User Profile
            </h3>
            <form onSubmit={e => onSubmit(e)}>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <div className='form-group'>
                            <label className='form-label'>
                                Address Line 1
                            </label>
                            <input 
                                className='form-control'
                                type='text'
                                name='address_line_1'
                                placeholder={`${ profile.address_line_1 }`}
                                onChange={e => onChange(e)}
                                value={ address_line_1 }
                            />
                        </div>
                    </li>

                    <li className='list-group-item'>
                        <div className='form-group'>
                            <label className='form-label'>
                                Address Line 2
                            </label>
                            <input 
                                className='form-control'
                                type='text'
                                name='address_line_2'
                                placeholder={`${ profile.address_line_2 }`}
                                onChange={e => onChange(e)}
                                value={ address_line_2 }
                            />
                        </div>
                    </li>

                    <li className='list-group-item'>
                        <div className='form-group'>
                            <label className='form-label'>
                                City
                            </label>
                            <input 
                                className='form-control'
                                type='text'
                                name='city'
                                placeholder={`${ profile.city }`}
                                onChange={e => onChange(e)}
                                value={ city }
                            />
                        </div>
                    </li>

                    <li className='list-group-item'>
                        <div className='form-group'>
                            <label className='form-label'>
                                State/Province/Region
                            </label>
                            <input 
                                className='form-control'
                                type='text'
                                name='state_province_region'
                                placeholder={`${ profile.state_province_region }`}
                                onChange={e => onChange(e)}
                                value={ state_province_region }
                            />
                        </div>
                    </li>

                    <li className='list-group-item'>
                        <div className='form-group'>
                            <label className='form-label'>
                                Postal Code/Zipcode
                            </label>
                            <input 
                                className='form-control'
                                type='text'
                                name='zipcode'
                                placeholder={`${ profile.zipcode }`}
                                onChange={e => onChange(e)}
                                value={ zipcode }
                            />
                        </div>
                    </li>

                    <li className='list-group-item'>
                        <div className='form-group'>
                            <label className='form-label'>
                                Telephone number
                            </label>
                            <input 
                                className='form-control'
                                type='text'
                                name='telephone_number'
                                placeholder={`${ profile.telephone_number }`}
                                onChange={e => onChange(e)}
                                value={ telephone_number }
                            />
                        </div>
                    </li>

                    <li className='list-group-item'>
                        <div className='form-group'>
                            <label className='form-label'>
                                Country/Region
                            </label>
                            <select
                                className='form-control'
                                id='country_region'
                                name='country_region'
                                onChange={e => onChange(e)}
                            >
                                <option value={ country_region }>{ country_region }</option>
                                {
                                    countries && countries.map((country, index) => (
                                        <option key={ index } value={ country.name }>{ country.name }</option>
                                    ))
                                }
                            </select>
                        </div>
                    </li>
                </ul>
                <li className='list-group-item'>
                    <button className='btn btn-primary' type='submit'>
                        Update Profile
                    </button>
                </li>
            </form>
        </div>
    )
}

export default UserProfileForm;
