package com.vymalo.school.schoolbackend.api

import com.vymalo.school.schoolbackend.model.PageResponseSchool
import com.vymalo.school.schoolbackend.model.School
import com.vymalo.school.schoolbackend.model.SchoolContact
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.RestController
import java.math.BigDecimal
import java.time.LocalDate

@Validated
@RestController
class SchoolApiImpl : SchoolApi {
    override suspend fun getSchools(): ResponseEntity<PageResponseSchool> {
        return PageResponseSchool(
            page = BigDecimal.ONE,
            offset = BigDecimal.TEN,
            items = mutableListOf(
                School(
                    id = "1",
                    name = "School 1",
                    contact = SchoolContact(
                        name = "Contact 1",
                        phoneNumber = "1234567890",
                    ),
                    createdAt = LocalDate.now(),
                    updatedAt = LocalDate.now()
                )
            )
        ).let {
            ResponseEntity.ok(it)
        }
    }

    override suspend fun getSingleSchool(id: String): ResponseEntity<School> = School(
        id = id,
        name = "School 1",
        contact = SchoolContact(name = "Contact 1", phoneNumber = "1234567890")
    ).let {
        ResponseEntity.ok(it)
    }
}