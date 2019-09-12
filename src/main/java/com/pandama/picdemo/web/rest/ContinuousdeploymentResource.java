package com.pandama.picdemo.web.rest;

import com.pandama.picdemo.domain.Continuousdeployment;
import com.pandama.picdemo.repository.ContinuousdeploymentRepository;
import com.pandama.picdemo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pandama.picdemo.domain.Continuousdeployment}.
 */
@RestController
@RequestMapping("/api")
public class ContinuousdeploymentResource {

    private final Logger log = LoggerFactory.getLogger(ContinuousdeploymentResource.class);

    private static final String ENTITY_NAME = "continuousdeployment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContinuousdeploymentRepository continuousdeploymentRepository;

    public ContinuousdeploymentResource(ContinuousdeploymentRepository continuousdeploymentRepository) {
        this.continuousdeploymentRepository = continuousdeploymentRepository;
    }

    /**
     * {@code POST  /continuousdeployments} : Create a new continuousdeployment.
     *
     * @param continuousdeployment the continuousdeployment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new continuousdeployment, or with status {@code 400 (Bad Request)} if the continuousdeployment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/continuousdeployments")
    public ResponseEntity<Continuousdeployment> createContinuousdeployment(@RequestBody Continuousdeployment continuousdeployment) throws URISyntaxException {
        log.debug("REST request to save Continuousdeployment : {}", continuousdeployment);
        if (continuousdeployment.getId() != null) {
            throw new BadRequestAlertException("A new continuousdeployment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Continuousdeployment result = continuousdeploymentRepository.save(continuousdeployment);
        return ResponseEntity.created(new URI("/api/continuousdeployments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /continuousdeployments} : Updates an existing continuousdeployment.
     *
     * @param continuousdeployment the continuousdeployment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated continuousdeployment,
     * or with status {@code 400 (Bad Request)} if the continuousdeployment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the continuousdeployment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/continuousdeployments")
    public ResponseEntity<Continuousdeployment> updateContinuousdeployment(@RequestBody Continuousdeployment continuousdeployment) throws URISyntaxException {
        log.debug("REST request to update Continuousdeployment : {}", continuousdeployment);
        if (continuousdeployment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Continuousdeployment result = continuousdeploymentRepository.save(continuousdeployment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, continuousdeployment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /continuousdeployments} : get all the continuousdeployments.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of continuousdeployments in body.
     */
    @GetMapping("/continuousdeployments")
    public List<Continuousdeployment> getAllContinuousdeployments() {
        log.debug("REST request to get all Continuousdeployments");
        return continuousdeploymentRepository.findAll();
    }

    /**
     * {@code GET  /continuousdeployments/:id} : get the "id" continuousdeployment.
     *
     * @param id the id of the continuousdeployment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the continuousdeployment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/continuousdeployments/{id}")
    public ResponseEntity<Continuousdeployment> getContinuousdeployment(@PathVariable Long id) {
        log.debug("REST request to get Continuousdeployment : {}", id);
        Optional<Continuousdeployment> continuousdeployment = continuousdeploymentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(continuousdeployment);
    }

    /**
     * {@code DELETE  /continuousdeployments/:id} : delete the "id" continuousdeployment.
     *
     * @param id the id of the continuousdeployment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/continuousdeployments/{id}")
    public ResponseEntity<Void> deleteContinuousdeployment(@PathVariable Long id) {
        log.debug("REST request to delete Continuousdeployment : {}", id);
        continuousdeploymentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
