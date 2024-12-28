package com.vymalo.school.schoolbackend.api

import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Controller
import org.springframework.web.reactive.function.server.RequestPredicates.GET
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.RouterFunctions.route
import org.springframework.web.reactive.function.server.ServerResponse
import java.net.URI

/**
 * Home redirection to OpenAPI api documentation
 */
@Controller
class HomeController {

    @Bean
    fun index(): RouterFunction<ServerResponse> = route(
        GET("/")
    ) {
        ServerResponse.temporaryRedirect(URI.create("swagger-ui.html")).build()
    }
}