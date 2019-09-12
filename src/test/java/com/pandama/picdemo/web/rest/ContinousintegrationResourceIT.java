package com.pandama.picdemo.web.rest;

import com.pandama.picdemo.PicdemoApp;
import com.pandama.picdemo.domain.Continousintegration;
import com.pandama.picdemo.repository.ContinousintegrationRepository;
import com.pandama.picdemo.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.pandama.picdemo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ContinousintegrationResource} REST controller.
 */
@SpringBootTest(classes = PicdemoApp.class)
public class ContinousintegrationResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private ContinousintegrationRepository continousintegrationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restContinousintegrationMockMvc;

    private Continousintegration continousintegration;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContinousintegrationResource continousintegrationResource = new ContinousintegrationResource(continousintegrationRepository);
        this.restContinousintegrationMockMvc = MockMvcBuilders.standaloneSetup(continousintegrationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Continousintegration createEntity(EntityManager em) {
        Continousintegration continousintegration = new Continousintegration()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT);
        return continousintegration;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Continousintegration createUpdatedEntity(EntityManager em) {
        Continousintegration continousintegration = new Continousintegration()
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT);
        return continousintegration;
    }

    @BeforeEach
    public void initTest() {
        continousintegration = createEntity(em);
    }

    @Test
    @Transactional
    public void createContinousintegration() throws Exception {
        int databaseSizeBeforeCreate = continousintegrationRepository.findAll().size();

        // Create the Continousintegration
        restContinousintegrationMockMvc.perform(post("/api/continousintegrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(continousintegration)))
            .andExpect(status().isCreated());

        // Validate the Continousintegration in the database
        List<Continousintegration> continousintegrationList = continousintegrationRepository.findAll();
        assertThat(continousintegrationList).hasSize(databaseSizeBeforeCreate + 1);
        Continousintegration testContinousintegration = continousintegrationList.get(continousintegrationList.size() - 1);
        assertThat(testContinousintegration.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testContinousintegration.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createContinousintegrationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = continousintegrationRepository.findAll().size();

        // Create the Continousintegration with an existing ID
        continousintegration.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContinousintegrationMockMvc.perform(post("/api/continousintegrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(continousintegration)))
            .andExpect(status().isBadRequest());

        // Validate the Continousintegration in the database
        List<Continousintegration> continousintegrationList = continousintegrationRepository.findAll();
        assertThat(continousintegrationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllContinousintegrations() throws Exception {
        // Initialize the database
        continousintegrationRepository.saveAndFlush(continousintegration);

        // Get all the continousintegrationList
        restContinousintegrationMockMvc.perform(get("/api/continousintegrations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(continousintegration.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getContinousintegration() throws Exception {
        // Initialize the database
        continousintegrationRepository.saveAndFlush(continousintegration);

        // Get the continousintegration
        restContinousintegrationMockMvc.perform(get("/api/continousintegrations/{id}", continousintegration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(continousintegration.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContinousintegration() throws Exception {
        // Get the continousintegration
        restContinousintegrationMockMvc.perform(get("/api/continousintegrations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContinousintegration() throws Exception {
        // Initialize the database
        continousintegrationRepository.saveAndFlush(continousintegration);

        int databaseSizeBeforeUpdate = continousintegrationRepository.findAll().size();

        // Update the continousintegration
        Continousintegration updatedContinousintegration = continousintegrationRepository.findById(continousintegration.getId()).get();
        // Disconnect from session so that the updates on updatedContinousintegration are not directly saved in db
        em.detach(updatedContinousintegration);
        updatedContinousintegration
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT);

        restContinousintegrationMockMvc.perform(put("/api/continousintegrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContinousintegration)))
            .andExpect(status().isOk());

        // Validate the Continousintegration in the database
        List<Continousintegration> continousintegrationList = continousintegrationRepository.findAll();
        assertThat(continousintegrationList).hasSize(databaseSizeBeforeUpdate);
        Continousintegration testContinousintegration = continousintegrationList.get(continousintegrationList.size() - 1);
        assertThat(testContinousintegration.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testContinousintegration.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingContinousintegration() throws Exception {
        int databaseSizeBeforeUpdate = continousintegrationRepository.findAll().size();

        // Create the Continousintegration

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContinousintegrationMockMvc.perform(put("/api/continousintegrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(continousintegration)))
            .andExpect(status().isBadRequest());

        // Validate the Continousintegration in the database
        List<Continousintegration> continousintegrationList = continousintegrationRepository.findAll();
        assertThat(continousintegrationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContinousintegration() throws Exception {
        // Initialize the database
        continousintegrationRepository.saveAndFlush(continousintegration);

        int databaseSizeBeforeDelete = continousintegrationRepository.findAll().size();

        // Delete the continousintegration
        restContinousintegrationMockMvc.perform(delete("/api/continousintegrations/{id}", continousintegration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Continousintegration> continousintegrationList = continousintegrationRepository.findAll();
        assertThat(continousintegrationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Continousintegration.class);
        Continousintegration continousintegration1 = new Continousintegration();
        continousintegration1.setId(1L);
        Continousintegration continousintegration2 = new Continousintegration();
        continousintegration2.setId(continousintegration1.getId());
        assertThat(continousintegration1).isEqualTo(continousintegration2);
        continousintegration2.setId(2L);
        assertThat(continousintegration1).isNotEqualTo(continousintegration2);
        continousintegration1.setId(null);
        assertThat(continousintegration1).isNotEqualTo(continousintegration2);
    }
}
