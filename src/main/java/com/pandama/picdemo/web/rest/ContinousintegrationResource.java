package com.pandama.picdemo.web.rest;

import com.pandama.picdemo.domain.Continousintegration;
import com.pandama.picdemo.repository.ContinousintegrationRepository;
import com.pandama.picdemo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pandama.picdemo.domain.Continousintegration}.
 */
@RestController
@RequestMapping("/api")
public class ContinousintegrationResource {

    private final Logger log = LoggerFactory.getLogger(ContinousintegrationResource.class);

    private static final String ENTITY_NAME = "continousintegration";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContinousintegrationRepository continousintegrationRepository;

    public ContinousintegrationResource(ContinousintegrationRepository continousintegrationRepository) {
        this.continousintegrationRepository = continousintegrationRepository;
    }

    /**
     * {@code POST  /continousintegrations} : Create a new continousintegration.
     *
     * @param continousintegration the continousintegration to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new continousintegration, or with status {@code 400 (Bad Request)} if the continousintegration has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/continousintegrations")
    public ResponseEntity<Continousintegration> createContinousintegration(@RequestBody Continousintegration continousintegration) throws URISyntaxException {
        log.debug("REST request to save Continousintegration : {}", continousintegration);
        if (continousintegration.getId() != null) {
            throw new BadRequestAlertException("A new continousintegration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Continousintegration result = continousintegrationRepository.save(continousintegration);
        return ResponseEntity.created(new URI("/api/continousintegrations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /continousintegrations} : Updates an existing continousintegration.
     *
     * @param continousintegration the continousintegration to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated continousintegration,
     * or with status {@code 400 (Bad Request)} if the continousintegration is not valid,
     * or with status {@code 500 (Internal Server Error)} if the continousintegration couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/continousintegrations")
    public ResponseEntity<Continousintegration> updateContinousintegration(@RequestBody Continousintegration continousintegration) throws URISyntaxException {
        log.debug("REST request to update Continousintegration : {}", continousintegration);
        if (continousintegration.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Continousintegration result = continousintegrationRepository.save(continousintegration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, continousintegration.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /continousintegrations} : get all the continousintegrations.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of continousintegrations in body.
     */
    @GetMapping("/continousintegrations")
    public ResponseEntity<List<Continousintegration>> getAllContinousintegrations(Pageable pageable) {
        log.debug("REST request to get a page of Continousintegrations");
        Page<Continousintegration> page = continousintegrationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /continousintegrations/:id} : get the "id" continousintegration.
     *
     * @param id the id of the continousintegration to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the continousintegration, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/continousintegrations/{id}")
    public ResponseEntity<Continousintegration> getContinousintegration(@PathVariable Long id) {
        log.debug("REST request to get Continousintegration : {}", id);
        Optional<Continousintegration> continousintegration = continousintegrationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(continousintegration);
    }

    /**
     * {@code DELETE  /continousintegrations/:id} : delete the "id" continousintegration.
     *
     * @param id the id of the continousintegration to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/continousintegrations/{id}")
    public ResponseEntity<Void> deleteContinousintegration(@PathVariable Long id) {
        log.debug("REST request to delete Continousintegration : {}", id);
        continousintegrationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
